import React, { useMemo } from 'react';
import { ApiAuth } from '../../../../api/Auth.api';
import { Tab, Tabs, Box, Grid, Alert } from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

import {
  useDebounce,
  useLocalStorageState,
  useTableUrlState,
  useUsersTable,
} from '../../../../hooks';
import { SearchInput } from '../../../../shared/components/SearchInput';
import {
  DataGrid,
  DataGridColumnVisibility,
  DataGridPagination,
  useDataGrid,
} from '../../../../shared/components/DataGrid';
import { usersColumns } from '../UsersTable';

const authController = new ApiAuth();

const DEFAULT_SORTING = [{ id: 'firstName', desc: false }];
const SEARCH_DEBOUNCE_MS = 500;
const COLUMN_VISIBILITY_KEY = 'users-table:column-visibility';
const DEFAULT_COLUMN_VISIBILITY = { direction: false };

// Se identifica cada fila por el id del usuario, no por su índice: así la
// selección sigue apuntando al mismo usuario al cambiar de página o de orden.
const getUserRowId = (user) => String(user.id);

export function ListUsers() {
  const accessToken = authController.getAccessToken();

  // Estado que vive en la URL y se manda al servidor: orden, paginación y
  // búsqueda. La vista queda enlazable y sobrevive al refresh.
  const {
    sorting,
    setSorting,
    pagination,
    setPagination,
    globalFilter,
    setGlobalFilter,
    queryParams,
  } = useTableUrlState({
    defaultSorting: DEFAULT_SORTING,
    defaultPageSize: 10,
  });

  // Las columnas visibles persisten, pero en localStorage y no en la URL:
  // es una preferencia de cada usuario, no parte de la vista que se comparte.
  const [columnVisibility, setColumnVisibility] = useLocalStorageState(
    COLUMN_VISIBILITY_KEY,
    DEFAULT_COLUMN_VISIBILITY
  );

  // Solo la búsqueda se retrasa. El input responde al instante contra la URL,
  // pero la petición espera a que el usuario deje de teclear.
  const debouncedSearch = useDebounce(queryParams.search, SEARCH_DEBOUNCE_MS);

  const requestParams = useMemo(
    () => ({ ...queryParams, search: debouncedSearch }),
    [queryParams, debouncedSearch]
  );

  const { users, totalItems, totalPages, isLoading, isFetching, isError, error } =
    useUsersTable({ accessToken, params: requestParams });

  const table = useDataGrid({
    data: users,
    columns: usersColumns,
    getRowId: getUserRowId,

    // Ordenar, filtrar y paginar los hace el servidor: la tabla no reordena
    // ni recorta lo que recibe, solo refleja la página que llegó.
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    pageCount: totalPages,
    rowCount: totalItems,

    sorting,
    onSortingChange: setSorting,
    pagination,
    onPaginationChange: setPagination,
    globalFilter,
    onGlobalFilterChange: setGlobalFilter,

    columnVisibility,
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item>
            <Tabs value={0} aria-label='basic tabs example'>
              <Tab
                icon={<PeopleOutlineIcon />}
                label='Usuarios'
                {...a11yProps(0)}
              />
            </Tabs>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            {/* Espacio flexible */}
          </Grid>
          <Grid item>Total usuarios registrados: {totalItems}</Grid>
          <Grid item>
            <DataGridColumnVisibility table={table} />
          </Grid>
          <Grid item>
            <SearchInput
              isFetching={isFetching}
              value={globalFilter}
              onChange={setGlobalFilter}
            />
          </Grid>
        </Grid>
      </Box>
      <br />

      {isError && (
        <Alert severity='error' sx={{ mx: 2, mb: 2 }}>
          No se pudieron cargar los usuarios
          {error?.message ? `: ${error.message}` : '.'}
        </Alert>
      )}

      <div
        style={{
          margin: '16px',
          backgroundColor: '#f0f0f0',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <DataGrid
          table={table}
          caption='Usuarios registrados'
          isLoading={isLoading}
          isFetching={isFetching}
          emptyMessage={
            globalFilter ? 'No hay usuarios con este filtro' : 'No hay usuarios'
          }
        />

        <DataGridPagination table={table} label='usuarios' />
      </div>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

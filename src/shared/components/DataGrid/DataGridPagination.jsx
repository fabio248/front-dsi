import React from 'react';
import {
  Box,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DEFAULT_PAGE_SIZES = [5, 10, 25, 50];

/**
 * Controles de paginación. Van aparte de <DataGrid> a propósito: leen y
 * escriben la misma instancia de tabla, así que el producto puede colocarlos
 * donde quiera (o no usarlos y escribir los suyos).
 *
 * Funciona igual con paginación de cliente o de servidor: en modo manual el
 * total de páginas sale de `pageCount`/`rowCount`, que vienen de la respuesta.
 */
export function DataGridPagination({
  table,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
  label = 'registros',
}) {
  const { pageIndex, pageSize } = table.getState().pagination;

  const pageCount = table.getPageCount();
  const rowCount = table.getRowCount();

  const firstRow = rowCount === 0 ? 0 : pageIndex * pageSize + 1;
  const lastRow = Math.min((pageIndex + 1) * pageSize, rowCount);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
        px: 1,
        py: 1.5,
      }}
    >
      <TextField
        select
        size='small'
        label={`Filas por página`}
        value={pageSize}
        onChange={(event) => table.setPageSize(Number(event.target.value))}
        sx={{ width: 140 }}
      >
        {pageSizeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* role="status" para que el cambio de página se anuncie al navegar. */}
      <Typography variant='body2' role='status'>
        {firstRow}–{lastRow} de {rowCount} {label}
      </Typography>

      <Box component='nav' aria-label='Paginación'>
        <IconButton
          aria-label='Primera página'
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          aria-label='Página anterior'
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Typography variant='body2' component='span' sx={{ mx: 1 }}>
          Página {pageCount === 0 ? 0 : pageIndex + 1} de {pageCount}
        </Typography>

        <IconButton
          aria-label='Página siguiente'
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <ChevronRightIcon />
        </IconButton>
        <IconButton
          aria-label='Última página'
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(pageCount - 1)}
        >
          <LastPageIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

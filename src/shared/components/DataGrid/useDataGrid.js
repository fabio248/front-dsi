import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useControllableState } from './useControllableState';

export const DEFAULT_PAGINATION = { pageIndex: 0, pageSize: 10 };

/**
 * Núcleo headless de la tabla: solo estado y row models.
 *
 * No renderiza nada ni impone markup o estilos; devuelve la instancia de
 * TanStack Table para que la UI de producto decida cómo pintarla.
 *
 * Cada porción de estado es opcionalmente controlada:
 *
 *   - Sin `sorting` ni `onSortingChange` -> lo maneja la tabla internamente.
 *   - Con ambos -> lo posee el producto, y puede sincronizarlo a la URL,
 *     al servidor o a donde haga falta.
 *
 * Los flags `manual*` desactivan el row model correspondiente cuando ese
 * trabajo lo hace el backend. En modo manual la tabla no reordena ni refiltra
 * lo que recibe: el servidor es la única fuente de verdad.
 */
export function useDataGrid({
  data,
  columns,
  getRowId,

  sorting,
  onSortingChange,
  initialSorting = [],

  columnFilters,
  onColumnFiltersChange,
  initialColumnFilters = [],

  globalFilter,
  onGlobalFilterChange,
  initialGlobalFilter = '',

  pagination,
  onPaginationChange,
  initialPagination = DEFAULT_PAGINATION,

  rowSelection,
  onRowSelectionChange,
  initialRowSelection = {},

  columnVisibility,
  onColumnVisibilityChange,
  initialColumnVisibility = {},

  manualSorting = false,
  manualFiltering = false,
  manualPagination = false,
  pageCount,
  rowCount,

  enableRowSelection = false,
  enableMultiSort = false,
  autoResetPageIndex = false,

  // Por defecto TanStack decide la dirección del primer click mirando el valor
  // de la primera fila: string -> asc, cualquier otra cosa -> desc. Con datos
  // opcionales eso depende de la página que se esté viendo (si el primer `dui`
  // es null, esa columna arranca en desc), así que la misma columna cambia de
  // comportamiento al paginar. Se fija ascendente siempre.
  sortDescFirst = false,

  ...tableOptions
}) {
  const [sortingState, setSortingState] = useControllableState(
    sorting,
    onSortingChange,
    initialSorting
  );

  const [columnFiltersState, setColumnFiltersState] = useControllableState(
    columnFilters,
    onColumnFiltersChange,
    initialColumnFilters
  );

  const [globalFilterState, setGlobalFilterState] = useControllableState(
    globalFilter,
    onGlobalFilterChange,
    initialGlobalFilter
  );

  const [paginationState, setPaginationState] = useControllableState(
    pagination,
    onPaginationChange,
    initialPagination
  );

  const [rowSelectionState, setRowSelectionState] = useControllableState(
    rowSelection,
    onRowSelectionChange,
    initialRowSelection
  );

  const [columnVisibilityState, setColumnVisibilityState] =
    useControllableState(
      columnVisibility,
      onColumnVisibilityChange,
      initialColumnVisibility
    );

  return useReactTable({
    data,
    columns,
    getRowId,

    state: {
      sorting: sortingState,
      columnFilters: columnFiltersState,
      globalFilter: globalFilterState,
      pagination: paginationState,
      rowSelection: rowSelectionState,
      columnVisibility: columnVisibilityState,
    },

    onSortingChange: setSortingState,
    onColumnFiltersChange: setColumnFiltersState,
    onGlobalFilterChange: setGlobalFilterState,
    onPaginationChange: setPaginationState,
    onRowSelectionChange: setRowSelectionState,
    onColumnVisibilityChange: setColumnVisibilityState,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
    getPaginationRowModel: manualPagination
      ? undefined
      : getPaginationRowModel(),

    manualSorting,
    manualFiltering,
    manualPagination,
    pageCount,
    rowCount,

    enableRowSelection,
    enableMultiSort,
    autoResetPageIndex,
    sortDescFirst,

    ...tableOptions,
  });
}

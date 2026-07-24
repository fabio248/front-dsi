import React from 'react';
import { flexRender } from '@tanstack/react-table';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

import './DataGrid.css';

const SORT_ICON = {
  asc: ArrowUpwardIcon,
  desc: ArrowDownwardIcon,
};

const ARIA_SORT = {
  asc: 'ascending',
  desc: 'descending',
};

function SortableHeader({ header }) {
  const { column } = header;
  const sortDirection = column.getIsSorted(); // false | 'asc' | 'desc'
  const Icon = SORT_ICON[sortDirection] ?? UnfoldMoreIcon;

  const label = flexRender(column.columnDef.header, header.getContext());

  const nextDirection = column.getNextSortingOrder();
  const actionLabel = nextDirection
    ? `Ordenar ${nextDirection === 'asc' ? 'ascendente' : 'descendente'}`
    : 'Quitar orden';

  return (
    <button
      type='button'
      className='data-grid__sort-button'
      onClick={column.getToggleSortingHandler()}
      // El th ya expone el estado con aria-sort; el botón describe la acción.
      title={actionLabel}
    >
      {label}
      <Icon
        aria-hidden='true'
        className={`data-grid__sort-icon ${
          sortDirection ? 'data-grid__sort-icon--active' : ''
        }`}
        fontSize='inherit'
      />
      <span className='data-grid__caption'>{actionLabel}</span>
    </button>
  );
}

/**
 * Renderiza markup de tabla accesible a partir de una instancia de TanStack
 * Table. Es puramente presentacional: no crea ni deriva estado, así que la
 * misma instancia puede pintarse de otra forma sin tocar la lógica.
 *
 * Accesibilidad:
 *  - `<caption>` describe la tabla para lectores de pantalla (oculto a la vista).
 *  - `scope="col"` en cada encabezado.
 *  - `aria-sort` en la columna ordenada; el orden se cambia con un `<button>`
 *    real, así que funciona con teclado sin handlers extra.
 *  - `aria-busy` mientras se refresca, y los mensajes de estado van en una
 *    región `role="status"` para que se anuncien.
 */
export function DataGrid({
  table,
  caption,
  isLoading = false,
  isFetching = false,
  emptyMessage = 'No hay resultados',
  loadingMessage = 'Cargando…',
}) {
  const visibleColumnCount = table.getVisibleLeafColumns().length;
  const rows = table.getRowModel().rows;

  const showLoading = isLoading;
  const showEmpty = !isLoading && rows.length === 0;

  return (
    <div className='data-grid__scroll'>
      <table className='data-grid' aria-busy={isFetching || isLoading}>
        {caption && <caption className='data-grid__caption'>{caption}</caption>}

        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sortDirection = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    scope='col'
                    colSpan={header.colSpan}
                    style={{ width: header.column.columnDef.meta?.width }}
                    aria-sort={
                      canSort ? ARIA_SORT[sortDirection] ?? 'none' : undefined
                    }
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <SortableHeader header={header} />
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody className={isFetching ? 'data-grid__body--busy' : undefined}>
          {showLoading && (
            <tr>
              <td colSpan={visibleColumnCount} className='data-grid__message'>
                <span role='status'>{loadingMessage}</span>
              </td>
            </tr>
          )}

          {showEmpty && (
            <tr>
              <td colSpan={visibleColumnCount} className='data-grid__message'>
                <span role='status'>{emptyMessage}</span>
              </td>
            </tr>
          )}

          {rows.map((row) => (
            <tr key={row.id} data-selected={row.getIsSelected()}>
              {row.getVisibleCells().map((cell) => {
                const variant = cell.column.columnDef.meta?.variant;

                return (
                  <td
                    key={cell.id}
                    className={
                      variant ? `data-grid__cell--${variant}` : undefined
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

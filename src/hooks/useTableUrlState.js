import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { rememberListQuery } from '../shared/listQueryMemory';

// Referencias estables: si se devolviera `[]` nuevo en cada render, el estado
// controlado de la tabla cambiaría de identidad sin cambiar de valor.
const EMPTY_SORTING = [];

function setOrDelete(params, key, value, defaultValue) {
  if (value === undefined || value === null || value === '' || value === defaultValue) {
    params.delete(key);
    return;
  }

  params.set(key, String(value));
}

/**
 * Estado de tabla respaldado por la query string, con la forma que espera
 * TanStack Table y con los nombres de parámetro del contrato de la API
 * (`page`, `limit`, `sortBy`, `sortOrder`, `search`).
 *
 * Sirve para dos cosas a la vez:
 *  - Las vistas son enlazables y sobreviven al refresh o al botón atrás.
 *  - `queryParams` sale listo para mandarlo al backend, sin traducir nada
 *    en el componente.
 *
 * Todas las escrituras hacen merge sobre los parámetros existentes, así que
 * ordenar no borra el filtro y filtrar no borra el orden. Cualquier cosa que
 * cambie el conjunto de resultados regresa a la página 1: quedarse en la
 * página 7 de un resultado que ahora tiene 2 páginas muestra una tabla vacía.
 *
 * Usa `replace` para no dejar una entrada de historial por cada tecleo.
 */
export function useTableUrlState({
  defaultSorting = [],
  defaultPageSize = 10,
  filterKeys = [],
} = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname, search } = useLocation();

  // Se anota la vista actual del listado para que las migas de pan de las
  // páginas de detalle puedan volver a ella con el filtro y el orden puestos.
  useEffect(() => {
    rememberListQuery(pathname, search);
  }, [pathname, search]);

  const update = useCallback(
    (mutate) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          mutate(next);
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // --- Lectura: URL -> estado de TanStack -------------------------------

  const pageParam = Number(searchParams.get('page'));
  const limitParam = Number(searchParams.get('limit'));

  const pageIndex =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam - 1 : 0;
  const pageSize =
    Number.isInteger(limitParam) && limitParam > 0 ? limitParam : defaultPageSize;

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  const sortByParam = searchParams.get('sortBy');
  const sortOrderParam = searchParams.get('sortOrder');

  const defaultSortBy = defaultSorting[0]?.id ?? null;
  const defaultSortDesc = defaultSorting[0]?.desc ?? false;

  const sorting = useMemo(() => {
    const id = sortByParam ?? defaultSortBy;
    if (!id) return EMPTY_SORTING;

    return [
      {
        id,
        desc: sortByParam ? sortOrderParam === 'desc' : defaultSortDesc,
      },
    ];
  }, [sortByParam, sortOrderParam, defaultSortBy, defaultSortDesc]);

  const globalFilter = searchParams.get('search') ?? '';

  // Se serializa para tener una dependencia primitiva: `filterKeys` y el
  // array resultante cambian de identidad en cada render.
  const filtersSignature = filterKeys
    .map((key) => `${key}=${searchParams.get(key) ?? ''}`)
    .join('&');

  const columnFilters = useMemo(
    () =>
      filtersSignature
        .split('&')
        .map((pair) => {
          const separatorIndex = pair.indexOf('=');
          return {
            id: pair.slice(0, separatorIndex),
            value: pair.slice(separatorIndex + 1),
          };
        })
        .filter((filter) => filter.id && filter.value !== ''),
    [filtersSignature]
  );

  // --- Escritura: estado de TanStack -> URL ------------------------------

  const setPagination = useCallback(
    (next) => {
      update((params) => {
        setOrDelete(params, 'page', next.pageIndex + 1, 1);
        setOrDelete(params, 'limit', next.pageSize, defaultPageSize);
      });
    },
    [update, defaultPageSize]
  );

  const setSorting = useCallback(
    (next) => {
      update((params) => {
        const rule = next[0];
        setOrDelete(params, 'sortBy', rule?.id);
        setOrDelete(params, 'sortOrder', rule ? (rule.desc ? 'desc' : 'asc') : undefined);
        params.delete('page');
      });
    },
    [update]
  );

  const setGlobalFilter = useCallback(
    (next) => {
      update((params) => {
        setOrDelete(params, 'search', next);
        params.delete('page');
      });
    },
    [update]
  );

  const setColumnFilters = useCallback(
    (next) => {
      update((params) => {
        const byId = new Map(next.map((filter) => [filter.id, filter.value]));

        filterKeys.forEach((key) => {
          const value = byId.get(key);
          setOrDelete(params, key, Array.isArray(value) ? value.join(',') : value);
        });

        params.delete('page');
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [update, filterKeys.join(',')]
  );

  // --- Salida lista para la API -----------------------------------------

  const queryParams = useMemo(() => {
    const rule = sorting[0];

    return {
      page: pageIndex + 1,
      limit: pageSize,
      search: globalFilter || undefined,
      sortBy: rule?.id,
      sortOrder: rule ? (rule.desc ? 'desc' : 'asc') : undefined,
      ...Object.fromEntries(
        columnFilters.map((filter) => [filter.id, filter.value])
      ),
    };
  }, [pageIndex, pageSize, globalFilter, sorting, columnFilters]);

  return {
    sorting,
    setSorting,
    pagination,
    setPagination,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
    queryParams,
  };
}

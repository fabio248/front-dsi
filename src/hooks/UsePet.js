import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {Pets} from '../api/Pets.api';

const petsController = new Pets();

// Referencia estable para el caso "sin datos": alimenta directo a la tabla,
// y un array nuevo en cada render la haría recalcular sus row models.
const EMPTY_PETS = [];

/**
 * Mascotas para la tabla: una página a la vez, ordenada y filtrada en servidor.
 *
 * Distinto de `usePet`, que acumula páginas para el scroll infinito. Aquí
 * `params` entra completo en la query key, así que cada combinación de página,
 * orden y filtro se cachea por separado.
 *
 * `keepPreviousData` mantiene visible la página anterior mientras llega la
 * nueva; sin eso la tabla parpadea a vacío en cada click de paginación.
 */
export function usePetsTable({accessToken, params, enabled = true}) {
    const result = useQuery({
        queryKey: ['pets', 'table', params],
        queryFn: () => petsController.getPetsPage(accessToken, params),
        keepPreviousData: true,
        enabled,
    });

    const page = result.data;

    const totalItems = page?.totalItems ?? 0;
    const limit = params?.limit > 0 ? params.limit : 10;

    // `totalPages` es parte del contrato nuevo. Mientras el backend no lo
    // mande se deriva de `totalItems`, que sí existe hoy: así la paginación
    // funciona contra la API actual y no hay que tocar nada cuando llegue.
    const totalPages = page?.totalPages ?? Math.ceil(totalItems / limit);

    return {
        ...result,
        pets: page?.data ?? EMPTY_PETS,
        totalItems,
        totalPages,
    };
}

export function usePet({accessToken, search}) {
    let totalPets = 0;
    const result = useInfiniteQuery({
        queryKey: ['pets', {search}],
        queryFn: async ({pageParam = 1}) => {
            return await petsController.getAllPets(accessToken, pageParam, search);
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.hasNextPage) return;

            return lastPage.nextPage;
        },
    });

    const pets =
        result.data?.pages.reduce((prevUsers, page) => {
            totalPets = page.totalItems;
            return prevUsers.concat(page.data);
        }, []) ?? [];

    return {
        ...result,
        pets,
        totalPets,
    };
}

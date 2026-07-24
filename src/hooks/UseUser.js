import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {UserApi} from '../api/User.api';

const userController = new UserApi();

// Referencia estable para el caso "sin datos": alimenta directo a la tabla,
// y un array nuevo en cada render la haría recalcular sus row models.
const EMPTY_USERS = [];

/**
 * Usuarios para la tabla: una página a la vez, ordenada y filtrada en servidor.
 *
 * Distinto de `useUser`, que acumula páginas para el scroll infinito. Aquí
 * `params` entra completo en la query key, así que cada combinación de página,
 * orden y filtro se cachea por separado.
 *
 * `keepPreviousData` mantiene visible la página anterior mientras llega la
 * nueva; sin eso la tabla parpadea a vacío en cada click de paginación.
 */
export function useUsersTable({accessToken, params, enabled = true}) {
    const result = useQuery({
        queryKey: ['users', 'table', params],
        queryFn: () => userController.getUsersPage(accessToken, params),
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
        users: page?.data ?? EMPTY_USERS,
        totalItems,
        totalPages,
    };
}

export function useUser({accessToken, search}) {
    let totalUsers = 0;
    const result = useInfiniteQuery({
        queryKey: ['users', search],
        queryFn: async ({pageParam = 1}) => {
            const data = await userController.getAllUsers(
                accessToken,
                pageParam,
                search
            );
            return data;
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.hasNextPage) return;

            return lastPage.nextPage;
        },
    });

    const users =
        result.data?.pages.reduce((prevUsers, page) => {
            totalUsers = page.totalItems;
            return prevUsers.concat(page.data);
        }, []) ?? [];

    return {
        ...result,
        users,
        totalUsers,
    };
}

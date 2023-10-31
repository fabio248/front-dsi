import {useInfiniteQuery} from '@tanstack/react-query';
import {UserApi} from '../api/User.api';

const userController = new UserApi();

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

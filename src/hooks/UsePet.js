import {useInfiniteQuery} from '@tanstack/react-query';
import {Pets} from '../api/Pets.api';

const petsController = new Pets();

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

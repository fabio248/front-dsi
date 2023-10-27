import { useInfiniteQuery } from '@tanstack/react-query';
import { Product } from '../api/Product.api';

const productController = new Product();

export function useProduct({ accessToken, search }) {
  let totalProducts = 0;
  const result = useInfiniteQuery({
    queryKey: ['products', search],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await productController.getAllProducts(
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

  const products =
    result.data?.pages.reduce((prevProduct, page) => {
       totalProducts = page.totalItems;
      return prevProduct.concat(page.data);
    }, []) ?? [];

  return {
    ...result,
    products,
    totalProducts,
  };
}

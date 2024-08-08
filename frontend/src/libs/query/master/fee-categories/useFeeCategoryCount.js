import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetFeeCategoriesCount = () => {
  return useQuery({
    queryKey: ['fee-categories-count'],
    queryFn: async () => {
      const { data } = await Api.get(`/master/fee-category/all/count`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetFeeCategoriesCount;

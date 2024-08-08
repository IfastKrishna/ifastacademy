import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetFeeCategoriesById = ({ id }) => {
  return useQuery({
    queryKey: ['fee-categories-by-id', id],
    queryFn: async () => {
      const { data } = await Api.get(`/master/fee-category/${id}`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetFeeCategoriesById;

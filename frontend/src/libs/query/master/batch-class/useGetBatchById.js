import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetBatchById = ({ id }) => {
  return useQuery({
    queryKey: ['batch-by-id', id],
    queryFn: async () => {
      const { data } = await Api.get(`/master/batch/${id}`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetBatchById;

import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetBatchesCount = () => {
  return useQuery({
    queryKey: ['batches-count'],
    queryFn: async () => {
      const { data } = await Api.get(`/master/batch/all/count`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetBatchesCount;

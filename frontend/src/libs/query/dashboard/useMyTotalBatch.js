import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useMyTotalBatch = () => {
  return useQuery({
    queryKey: ['myTotalBatch'],
    queryFn: async () => {
      const { data } = await Api.get('/dashboard/my-total-batch');
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => {
      if (error.status === 404) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
  });
};

export default useMyTotalBatch;

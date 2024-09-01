import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useTotalCollectedFeeInThisMonth = () => {
  return useQuery({
    queryKey: ['totalCollectedFeeInThisMonth'],
    queryFn: async () => {
      const { data } = await Api.get('/dashboard/total-collected-fees-by-range');
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

export default useTotalCollectedFeeInThisMonth;

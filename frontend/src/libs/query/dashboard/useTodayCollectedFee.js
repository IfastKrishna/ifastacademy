import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useTodayCollectedFee = () => {
  return useQuery({
    queryKey: ['todayCollectedFee'],
    queryFn: async () => {
      const { data } = await Api.get('/dashboard/today-collected-fees');
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

export default useTodayCollectedFee;

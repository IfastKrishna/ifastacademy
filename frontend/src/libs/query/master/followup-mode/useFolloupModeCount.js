import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetFollowupModesCount = () => {
  return useQuery({
    queryKey: ['followup-modes-count'],
    queryFn: async () => {
      const { data } = await Api.get(`/master/followup-mode/all/count`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetFollowupModesCount;

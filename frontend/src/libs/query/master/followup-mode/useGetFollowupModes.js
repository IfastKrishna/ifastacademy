import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetFollowupModes = ({ page = 1, pageSize = 10, search }) => {
  return useQuery({
    queryKey: ['followup-modes', { page, pageSize, search }],
    queryFn: async () => {
      const { data } = await Api.get('/master/followup-mode/all', {
        params: { page, pageSize, search },
      });
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetFollowupModes;

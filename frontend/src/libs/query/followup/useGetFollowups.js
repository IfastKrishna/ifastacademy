import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetFollowups = ({ page = 1, pageSize = 10, search = '' }) => {
  return useQuery({
    queryKey: ['followups', { page, pageSize, search }],
    queryFn: async () => {
      const { data } = await Api.get('/followup/all', { params: { page, pageSize, search } });
      return data;
    },
    staleTime: Infinity,
  });
};

export default useGetFollowups;

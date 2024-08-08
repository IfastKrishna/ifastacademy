import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetLeadSources = ({ page = 1, pageSize = 10, search }) => {
  return useQuery({
    queryKey: ['lead-sources', { page, pageSize, search }],
    queryFn: async () => {
      const { data } = await Api.get('/master/lead-source/all', {
        params: { page, pageSize, search },
      });
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetLeadSources;

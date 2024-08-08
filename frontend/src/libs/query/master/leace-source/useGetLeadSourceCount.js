import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetLeadSourceCount = () => {
  return useQuery({
    queryKey: ['lead-sources-count'],
    queryFn: async () => {
      const { data } = await Api.get(`/master/lead-source/all/count`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetLeadSourceCount;

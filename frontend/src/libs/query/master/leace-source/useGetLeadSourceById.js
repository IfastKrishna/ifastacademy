import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetLeadSourceById = ({ id }) => {
  return useQuery({
    queryKey: ['lead-source-by-id', id],
    queryFn: async () => {
      const { data } = await Api.get(`/master/lead-source/${id}`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetLeadSourceById;

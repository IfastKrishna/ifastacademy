import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetFollowupById = ({ id }) => {
  return useQuery({
    queryKey: ['followup-by-id', id],
    queryFn: async () => {
      const { data } = await Api.get('/followup/' + id);
      return data;
    },
    staleTime: Infinity,
  });
};

export default useGetFollowupById;

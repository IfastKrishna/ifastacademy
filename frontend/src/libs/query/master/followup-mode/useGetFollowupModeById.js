import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetFollowupModeById = ({ id }) => {
  return useQuery({
    queryKey: ['followup-mode', id],
    queryFn: async () => {
      const { data } = await Api.get(`/master/followup-mode/${id}`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetFollowupModeById;

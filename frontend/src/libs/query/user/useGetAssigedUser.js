import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetAssignableUser = ({ roles }) => {
  roles = roles.join(',');
  return useQuery({
    queryKey: ['users-assigned', roles],
    queryFn: async () => {
      const response = await Api.get(`/user/roles/${roles}`);
      return response.data;
    },
    retry: (failureCount, error) => failureCount < 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export default useGetAssignableUser;

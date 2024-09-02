import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetUsers = ({ page = 1, pageSize = 10, search = '' }) => {
  return useQuery({
    queryKey: ['users', page, pageSize, search],
    queryFn: async () => {
      const response = await Api.get(`/user/all?page=${page}&limit=${pageSize}&search=${search}`);
      return response.data;
    },
    retry: (failureCount, error) => failureCount < 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: page > 0 && pageSize > 0,
  });
};

export default useGetUsers;

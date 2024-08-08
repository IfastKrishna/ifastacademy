import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

export default function useGetEmployees({ page = 1, pageSize = 10, search = '' }) {
  return useQuery({
    queryKey: ['employees', { page, pageSize, search }],
    queryFn: async () => {
      const { data } = await Api.get('/master/employee/all', {
        params: {
          page,
          pageSize,
          search,
        },
      });
      return data;
    },
    retry: (failureCount, error) => failureCount < 1,
    staleTime: Infinity,
  });
}

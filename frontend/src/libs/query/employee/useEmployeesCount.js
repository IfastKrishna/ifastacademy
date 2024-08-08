import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

export default function useGetEmployeesCount() {
  return useQuery({
    queryKey: ['employees-count'],
    queryFn: async () => {
      const { data } = await Api.get('/master/employee/all/count');
      return data;
    },
    retry: (failureCount, error) => failureCount < 1,
    staleTime: Infinity,
  });
}

import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

export default function useGetEmployeeById({ id }) {
  return useQuery({
    queryKey: ['employees-by-id', id],
    queryFn: async () => {
      const { data } = await Api.get('/master/employee/' + id);
      return data;
    },
    retry: (failureCount, error) => failureCount < 1,
    staleTime: Infinity,
  });
}

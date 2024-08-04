import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

export default function useGetStudent() {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const { data } = await Api.get('/student/all');
      return data;
    },
    retry: (failureCount, error) => failureCount < 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

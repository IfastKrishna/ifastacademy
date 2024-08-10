import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetTodayBirthdaysCount = () => {
  return useQuery({
    queryKey: ['users-today-birthday-count'],
    queryFn: async () => {
      const response = await Api.get(`/user/get-today-birthdays-count`);
      return response.data;
    },
    retry: (failureCount, error) => failureCount < 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export default useGetTodayBirthdaysCount;

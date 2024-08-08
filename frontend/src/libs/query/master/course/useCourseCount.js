import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetCoursesCount = () => {
  return useQuery({
    queryKey: ['courses-count'],
    queryFn: async () => {
      const { data } = await Api.get('/master/course/all/count');
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetCoursesCount;

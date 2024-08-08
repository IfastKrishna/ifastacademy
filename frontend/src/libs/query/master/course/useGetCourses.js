import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetCourses = ({ page = 1, pageSize = 10, search }) => {
  return useQuery({
    queryKey: ['courses', { page, pageSize, search }],
    queryFn: async () => {
      const { data } = await Api.get('/master/course/all', { params: { page, pageSize, search } });
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetCourses;

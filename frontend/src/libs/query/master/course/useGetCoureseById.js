import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetCourseById = ({ id }) => {
  return useQuery({
    queryKey: ['course-by-id', id],
    queryFn: async () => {
      const { data } = await Api.get(`/master/course/${id}`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetCourseById;

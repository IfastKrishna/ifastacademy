import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetCourseEnquiresById = ({ id }) => {
  return useQuery({
    queryKey: ['course-enquires-by-id', id],
    queryFn: async () => {
      const { data } = await Api.get('/course-enquire/' + id);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => {
      if (error.status === 404) return false;
      return failureCount < 3;
    },
  });
};

export default useGetCourseEnquiresById;

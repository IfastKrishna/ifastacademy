import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetCourseEnquires = ({ page, pageSize, search }) => {
  return useQuery({
    queryKey: ['course-enquires', { page, pageSize, search }],
    queryFn: async () => {
      const { data } = await Api.get('/course-enquire/all');
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => {
      if (error.status === 404) return false;
      return failureCount < 3;
    },
  });
};

export default useGetCourseEnquires;

import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetCourseEnquireCount = () => {
  return useQuery({
    queryKey: ['course-enquires-count'],
    queryFn: async () => {
      const { data } = await Api.get('/course-enquire/all/count');
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
};

export default useGetCourseEnquireCount;

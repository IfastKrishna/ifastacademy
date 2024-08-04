import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetCourseEnquiers = ({ page = 1, pageSize = 10, search = '' }) => {
  return useQuery({
    queryKey: ['course-enquires', { page, pageSize, search }],
    queryFn: async () => {
      const { data } = await Api.get('/course-enquire/all', {
        params: { page, pageSize, search },
      });
      return data;
    },
    staleTime: Infinity,
  });
};

export default useGetCourseEnquiers;

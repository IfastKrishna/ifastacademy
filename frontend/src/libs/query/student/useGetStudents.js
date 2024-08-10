import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetStudents = ({ page = 1, pageSize = 10, search = '' }) => {
  return useQuery({
    queryKey: ['students', { page, pageSize, search }],
    queryFn: async () => {
      const { data } = await Api.get(
        `/student/all?page=${page}&pageSize=${pageSize}&search=${search}`
      );
      return data;
    },
    retry: (failureCount, error) => failureCount < 1,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export default useGetStudents;

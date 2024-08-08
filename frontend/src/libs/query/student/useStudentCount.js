import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetStudentsCount = () => {
  return useQuery({
    queryKey: ['students-count'],
    queryFn: async () => {
      const { data } = await Api.get(`/student/all/count`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetStudentsCount;

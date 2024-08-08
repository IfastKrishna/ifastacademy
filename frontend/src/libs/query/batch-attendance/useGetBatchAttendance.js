import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetBatchAttendance = () => {
  return useQuery({
    queryKey: ['batch-attendance'],
    queryFn: async () => {
      const { data } = await Api.get('/batch-attendance');
      return data;
    },
    retry: (failureCount, error) => failureCount < 1,
    staleTime: Infinity,
  });
};

export default useGetBatchAttendance;

import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetBatchAttendanceDateWise = (batchInfo) => {
  console.log('batchInfo', batchInfo);
  return useQuery({
    queryKey: ['batch-attendance', batchInfo],
    queryFn: async () => {
      const { data } = await Api.get(`/batch-attendance/attendance`, {
        params: {
          batchInfo,
        },
      });
      return data;
    },
    retry: (failureCount, error) => failureCount < 1,
    staleTime: Infinity,
  });
};

export default useGetBatchAttendanceDateWise;

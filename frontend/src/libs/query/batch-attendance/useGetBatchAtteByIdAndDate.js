import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useGetBatchAndDateWiseAttendance = (batchInfo) => {
  return useQuery({
    queryKey: ['batch-date-wise-attendance', batchInfo],
    queryFn: async () => {
      const { data } = await Api.get(`/batch-attendance/batch-date-wise-attendance`, {
        params: batchInfo,
      });
      return data;
    },

    retry: (failureCount, error) => {
      toast.error(error?.response?.data?.message);
      return failureCount < 1;
    },
    staleTime: Infinity,
    enabled: !!batchInfo.batchId && !!batchInfo.date,
  });
};

export default useGetBatchAndDateWiseAttendance;

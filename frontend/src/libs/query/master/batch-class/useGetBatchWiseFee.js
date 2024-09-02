import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetBatchWiseFeeList = ({ batchId, startDate, endDate }) => {
  return useQuery({
    queryKey: ['batchWiseFeesList', batchId, startDate, endDate],
    queryFn: async () => {
      const { data } = await Api.get(
        `/dashboard/batch-wise-fee-list?batchId=${batchId}&startDate=${startDate}&endDate=${endDate}`
      );
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => {
      if (error.status === 404) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
  });
};

export default useGetBatchWiseFeeList;

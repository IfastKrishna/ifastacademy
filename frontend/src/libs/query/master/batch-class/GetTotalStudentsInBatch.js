import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetStudentsInBatch = ({ id }) => {
  return useQuery({
    queryKey: ['totalStudentsInBatch', id],
    queryFn: async () => {
      const { data } = await Api.get(`/master/batch/total-student/${id}`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
    enabled: !!id,
  });
};

export default useGetStudentsInBatch;

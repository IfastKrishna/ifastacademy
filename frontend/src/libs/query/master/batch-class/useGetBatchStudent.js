import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetBatchStudentById = ({ id }) => {
  return useQuery({
    queryKey: ['totalStudentInBatch', id],
    queryFn: async () => {
      const { data } = await Api.get(`/master/batch/total-student/${id}`);
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetBatchStudentById;

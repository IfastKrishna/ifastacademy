import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetStudentMyBatch = ({ studentId }) => {
  return useQuery({
    queryKey: ['student-my-batches', studentId],

    queryFn: async () => {
      const { data } = await Api.get('/student/my-batches/' + studentId);
      return data;
    },

    retry: (failureCount, error) => failureCount < 1,

    staleTime: Infinity,
  });
};

export default useGetStudentMyBatch;

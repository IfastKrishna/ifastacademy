// get - absent - days;
import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetStudentAbsentBatchWise = ({ studentId }) => {
  return useQuery({
    queryKey: ['student-absent-days', studentId],

    queryFn: async () => {
      const { data } = await Api.get('/student/get-absent-days/' + studentId);
      return data;
    },

    retry: (failureCount, error) => failureCount < 1,

    staleTime: Infinity,
  });
};

export default useGetStudentAbsentBatchWise;

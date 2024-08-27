import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetStudentCurrAttendance = ({ studentId }) => {
  return useQuery({
    queryKey: ['student-curr-attendances', studentId],

    queryFn: async () => {
      const { data } = await Api.get('/student/get-batches-attendance/' + studentId);
      return data;
    },

    staleTime: Infinity,

    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetStudentCurrAttendance;

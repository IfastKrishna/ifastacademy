import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetStudentTotalPaidFees = ({ studentId }) => {
  return useQuery({
    queryKey: ['student-total-paid', studentId],

    queryFn: async () => {
      const { data } = await Api.get('/student/get-total-paid-fee/' + studentId);
      return data;
    },

    staleTime: Infinity,

    retry: (failureCount, error) => failureCount < 1,
  });
};

export default useGetStudentTotalPaidFees;

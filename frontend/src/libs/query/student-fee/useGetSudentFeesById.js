import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetStudentFeesById = ({ id }) => {
  return useQuery({
    queryKey: ['student-fees-by-id', id],
    queryFn: async () => {
      const { data } = await Api.get('/student/fee/' + id);
      return data;
    },
    retry: (failureCount, error) => failureCount < 1,
    staleTime: Infinity,
  });
};

export default useGetStudentFeesById;

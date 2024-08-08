import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetStudentFees = (page = 1, pageSize = 10, search = '') => {
  return useQuery({
    queryKey: ['student-fees', page, pageSize, search],
    queryFn: async () => {
      const { data } = await Api.get('/student-fee', {
        params: {
          page,
          pageSize,
          search,
        },
      });
      return data;
    },
    retry: (failureCount, error) => failureCount < 1,
    staleTime: Infinity,
  });
};

export default useGetStudentFees;

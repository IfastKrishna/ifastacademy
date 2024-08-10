import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useGetStudentById = ({ id }) => {
  return useQuery({
    queryKey: ['student', { id }],
    queryFn: async () => {
      const { data } = await Api.get(`/student/${id}`);
      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
    retry: (failureCount, error) => failureCount < 1,
    staleTime: Infinity,
  });
};

export default useGetStudentById;

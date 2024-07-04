import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Api from '../../../utils/api';

const useGetUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await Api.get('/user/all');
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'], staleTime: Infinity });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.message || 'An error occurred. Please try again.');
    },
  });
};

export default useGetUsers;

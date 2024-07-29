import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Api from '../../../utils/api';

const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await Api.post('/user/logout');
      return data;
    },
    onSuccess: () => {
      toast.success('Logout successfully');
      queryClient.invalidateQueries('isAuth');
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.message || 'An error occurred. Please try again.');
    },
  });
};

export default useLogout;

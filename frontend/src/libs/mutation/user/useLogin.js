import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Api from '../../../utils/api';

const useLogin = () =>
  useMutation({
    mutationFn: async (user) => {
      const { data } = await Api.post('/login', user);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.message || 'An error occurred. Please try again.');
    },
  });

export default useLogin;

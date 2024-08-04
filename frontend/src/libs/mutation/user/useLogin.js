import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Api from '../../../utils/api';

const useLogin = () =>
  useMutation({
    mutationFn: async (user) => {
      const { data } = await Api.post('/user/login', user);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.response?.data?.message || 'An error occurred. Please try again.');
    },
  });

export default useLogin;

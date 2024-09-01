import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newData) => {
      const { data } = await Api.post(`/user/change-password`, newData);
      return data;
    },
    onSuccess: (res) => {
      toast.success(res?.message);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useUpdatePassword;

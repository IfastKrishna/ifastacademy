import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useUserBlockUnblock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await Api.patch(`/user/${id}`);
      return data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries('users');
      toast.success(res?.message);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useUserBlockUnblock;

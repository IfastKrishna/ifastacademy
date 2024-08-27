import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useAddUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await Api.post('/user', data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('users');
      queryClient.invalidateQueries('getNextId');
      toast.success('User added successfully');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return mutation;
};

export default useAddUser;

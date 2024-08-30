import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Api from '../../../utils/api';

const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newData) => {
      const { data } = await Api.patch('/user/update-profile/' + newData?._id, newData);
      return data;
    },
    onSuccess: () => {
      toast.success('Logout successfully');
      queryClient.invalidateQueries('isAuth');
      queryClient.invalidateQueries('users');
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.message || 'An error occurred. Please try again.');
    },
  });
};

export default useUpdateUserProfile;

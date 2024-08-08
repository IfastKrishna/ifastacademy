import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useDeleteFollowupMode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await Api.delete(`/master/followup-mode/${id}`);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('followup-modes');
      queryClient.invalidateQueries('followup-modes-count');
      toast.success('Followup Mode delete successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useDeleteFollowupMode;

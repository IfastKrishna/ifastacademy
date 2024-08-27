import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useDeleteAllFollowup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await Api.delete('/followup/all');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('followups');
      toast.success('Deleted all followup successfully');
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'An error occurred');
    },
  });
};

export default useDeleteAllFollowup;

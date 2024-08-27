import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useDeleteFollowup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      id = JSON.stringify(id);
      const response = await Api.delete('/followup/' + id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('followups');
      toast.success('Followup delete successfully');
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'An error occurred');
    },
  });
};

export default useDeleteFollowup;

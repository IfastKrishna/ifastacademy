import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useAddFollowup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await Api.post('/followup', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('followups');
      toast.success('Followup added successfully');
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'An error occurred');
    },
  });
};

export default useAddFollowup;

import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useAddFollowupMode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (followupMode) => {
      const { data } = await Api.post('/master/followup-mode', followupMode);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('followup-modes');
      queryClient.invalidateQueries('followup-modes-count');
      toast.success('Followup Mode added successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useAddFollowupMode;

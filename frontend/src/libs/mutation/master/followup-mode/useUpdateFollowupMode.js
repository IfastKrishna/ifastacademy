import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useUpdateFollowupMode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (followupMode) => {
      const { data } = await Api.patch(`/master/followup-mode/${followupMode._id}`, {
        followupMode: followupMode.followupMode,
      });
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('followup-modes');
      queryClient.invalidateQueries('followup-modes-count');
      toast.success('Followup Mode update successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useUpdateFollowupMode;

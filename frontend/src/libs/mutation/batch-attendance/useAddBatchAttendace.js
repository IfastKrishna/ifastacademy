import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Api from 'src/utils/api';

const useAddBatchAttendace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const { data: res } = await Api.patch('/batch-attendance/create-update', data);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('batch-attendance');
      toast.success('Batch attendance added successfully');
    },

    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useAddBatchAttendace;

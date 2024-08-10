import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useUpdateBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (batch) => {
      console.log('batch', batch);
      const { data } = await Api.patch('/master/batch/' + batch?._id, batch);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('batches');
      queryClient.invalidateQueries('batches-count');
      queryClient.invalidateQueries('totalStudentInBatch');
      toast.success('Batch/Class update successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useUpdateBatch;

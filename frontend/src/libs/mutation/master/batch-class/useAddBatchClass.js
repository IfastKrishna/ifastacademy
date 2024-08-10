import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useAddBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (batch) => {
      const { data } = await Api.post('/master/batch', batch);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('batches');
      queryClient.invalidateQueries('totalStudentInBatch');
      queryClient.invalidateQueries('batches-count');
      toast.success('Batch/Class added successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useAddBatch;

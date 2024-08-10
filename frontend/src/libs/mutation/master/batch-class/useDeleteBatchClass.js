import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useDeleteBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      id = JSON.stringify(id);
      const { data } = await Api.delete('/master/batch/' + id);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('batches');
      queryClient.invalidateQueries('totalStudentInBatch');
      queryClient.invalidateQueries('batches-count');
      toast.success('Batch/Class deleted successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useDeleteBatch;

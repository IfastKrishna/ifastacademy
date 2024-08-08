import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useDeleteFeeCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await Api.delete(`/master/fee-category/${JSON.stringify([id])}`);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('fee-categories');
      queryClient.invalidateQueries('fee-categories-count');
      toast.success('Fee Categories delete successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useDeleteFeeCategories;

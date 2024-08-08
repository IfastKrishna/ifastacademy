import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useUpdateFeeCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (feeCategories) => {
      const { data } = await Api.patch(`/master/fee-category/${feeCategories.id}`, feeCategories);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('fee-categories');
      queryClient.invalidateQueries('fee-categories-count');
      toast.success('Fee Categories updated successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useUpdateFeeCategories;

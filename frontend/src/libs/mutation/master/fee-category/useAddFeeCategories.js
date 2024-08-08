import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useAddFeeCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (course) => {
      const { data } = await Api.post('/master/fee-category', course);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('fee-categories');
      queryClient.invalidateQueries('fee-categories-count');
      toast.success('Fee Categories added successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useAddFeeCategories;

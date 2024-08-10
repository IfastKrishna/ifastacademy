import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      id = JSON.stringify(id);
      const { data } = await Api.delete('/master/employee/' + id);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('employees');
      queryClient.invalidateQueries('employees-count');
      toast.success('Course added successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useDeleteEmployee;

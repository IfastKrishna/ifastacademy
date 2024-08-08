import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useAddStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (student) => {
      const { data } = await Api.post('/student', student);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('students');
      toast.success('Student added successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useAddStudent;

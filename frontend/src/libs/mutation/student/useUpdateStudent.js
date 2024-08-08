import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (student) => {
      const { data } = await Api.patch(`/student/${student?._id}`, student);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('students');
      toast.success('Student update successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useUpdateStudent;

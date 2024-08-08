import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const string = JSON.stringify(id);
      const { data } = await Api.delete(`/master/course/${string}`);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('courses');
      queryClient.invalidateQueries('courses-count');
      toast.success('Course delete successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useDeleteCourse;

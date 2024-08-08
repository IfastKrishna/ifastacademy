import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useAddCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (course) => {
      const { data } = await Api.post('/master/course', course);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('courses');
      queryClient.invalidateQueries('courses-count');
      toast.success('Course added successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useAddCourse;

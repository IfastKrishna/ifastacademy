import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useAddEnquire = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await Api.post('/course-enquire', formData);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('course-enquires');
      queryClient.invalidateQueries('course-enquires-count');
      toast.success('Enquire added successfully');
    },

    onError: (error) => {
      toast.error(error.response.data.message || 'Something went wrong');
    },
  });
};

export default useAddEnquire;

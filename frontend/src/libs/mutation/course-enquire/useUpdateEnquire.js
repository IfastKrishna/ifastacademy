import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useUpdateEnquire = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newData) => {
      const { data } = await Api.patch('/course-enquire/' + newData?._id, newData);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('course-enquires');
      toast.success('Enquire added successfully');
    },

    onError: (error) => {
      toast.error(error.response.data.message || 'Something went wrong');
    },
  });
};

export default useUpdateEnquire;

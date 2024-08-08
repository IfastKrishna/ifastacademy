import { useQueryClient, useMutation } from '@tanstack/react-query';
import Api from 'src/utils/api';
import toast from 'react-hot-toast';

const useAddLeadSource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (leadSource) => {
      console.log(leadSource);
      const { data } = await Api.post('/master/lead-source', leadSource);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries('lead-sources');
      queryClient.invalidateQueries('lead-sources-count');
      toast.success('Followup Mode added successfully');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'An error occurred');
    },
  });
};

export default useAddLeadSource;

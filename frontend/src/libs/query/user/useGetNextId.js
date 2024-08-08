import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useGetNextId = ({ fetching }) => {
  return useQuery({
    queryKey: ['getNextId', fetching],
    queryFn: async () => {
      const { data } = await Api.get('/user/get-next-ifast-id');
      return data;
    },
  });
};

export default useGetNextId;

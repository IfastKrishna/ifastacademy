import { useQuery } from '@tanstack/react-query';
import Api from '../../../utils/api';

const useIsAuth = () =>
  useQuery({
    queryKey: ['isAuth'],
    queryFn: async () => {
      const { data } = await Api.get('/user/me');
      return data;
    },
    retry: (failureCount, error) => failureCount < 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

export default useIsAuth;

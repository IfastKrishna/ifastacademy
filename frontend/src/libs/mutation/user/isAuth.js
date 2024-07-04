const { useQuery } = require('@tanstack/react-query');
const { default: Api } = require('../../../utils/api');

const IsAuth = () =>
  useQuery({
    queryKey: ['isAuth'],
    queryFn: async () => {
      const { data } = await Api.get('user/get-current');
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, _) => failureCount > 1,
    refetchOnWindowFocus: false,
  });

export default IsAuth;

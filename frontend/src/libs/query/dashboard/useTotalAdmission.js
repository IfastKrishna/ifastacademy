import { useQuery } from '@tanstack/react-query';
import Api from 'src/utils/api';

const useTotalAdmissionInThisMonth = ({ id = '', role = '' }) => {
  return useQuery({
    queryKey: ['totalAdmissionInThisMonth', id, role],
    queryFn: async () => {
      const { data } = await Api.get(
        '/dashboard/total-admission-in-this-month?role=' + role + '&id=' + id
      );
      return data;
    },
    staleTime: Infinity,
    retry: (failureCount, error) => {
      if (error.status === 404) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
  });
};

export default useTotalAdmissionInThisMonth;

import { useSearchParams } from 'react-router-dom';

export function useParams() {
  const parms = useSearchParams();
  return parms;
}

import { useQuery } from 'react-query';
import axios from 'axios';
import { AppStatus } from '../types';
import API from '../utils/api';

interface UseApp {
  isLoading: boolean;
  isError: boolean;
  appStatus?: AppStatus;
  error?: unknown;
}

export default function useAppStatus(): UseApp {
  const {
    // status,
    // isIdle,
    isLoading,
    // isSuccess,
    isError,
    data,
    error,
    // isStale,
    // isFetching,
    // failureCount,
    // refetch,
    // clear,
  } = useQuery<AppStatus>(
    'app-status',
    async () => {
      const { data } = await axios.get<AppStatus>(API.getAppStatus);
      return data;
    },
    {
      // Refetch the data every second
      refetchInterval: 100,
    },
  );

  return { isLoading, isError, appStatus: data, error };
}

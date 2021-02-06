import { useQuery } from 'react-query';
import axios from 'axios';
import { AppStatus } from '../types';
import API from '../utils/api';

interface UseApp {
  isLoading: boolean;
  isError: boolean;
  appStatus?: AppStatus;
  error?: Error;
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

  const err = error as Error;

  return { isLoading, isError, appStatus: data, error: err };
}

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useSocket } from '@/providers/web-socket';
import { MessageWithUser, ParamKey } from '@/types/app';

type Props = {
  queryKey: string;
  apiURL: string;
  paramKey: ParamKey;
  paramValue: string;
  pageSize: number;
};

export const useChatFetcher = ({ apiURL, pageSize, paramKey, paramValue, queryKey }: Props) => {
  const { isConnected } = useSocket();

  const fetcher = async ({
    pageParam = 0,
  }: {
    pageParam?: unknown;
  }): Promise<{ data: MessageWithUser[] }> => {
    const page = typeof pageParam === 'number' ? pageParam : 0;
    const url = `${apiURL}?${paramKey}=${encodeURIComponent(
      paramValue,
    )}&page=${page}&size=${pageSize}`;

    const { data } = await axios.get<{ data: MessageWithUser[] }>(url);

    return data;
  };

  return useInfiniteQuery<{ data: MessageWithUser[] }, Error>({
    queryKey: [queryKey, paramValue],
    queryFn: fetcher,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length === pageSize ? allPages.length : undefined,
    refetchInterval: isConnected ? false : 1000,
    retry: 3,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    initialPageParam: 0,
  });
};

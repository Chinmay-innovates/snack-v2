import { useChatFetcher } from '@/hooks/use-chat-fetcher';
import { Channel, MessageType, ParamKey, User, Workspace } from '@/types/app';

type Props = {
  user: User;
  name: string | null;
  chatId: string;
  apiURL: string;
  socketURL: string;
  socketQuery: Record<string, string>;
  paramKey: ParamKey;
  paramValue: string;
  type: MessageType;
  workspace: Workspace;
  channel?: Channel;
};

export const ChatMessages = ({
  apiURL,
  socketURL,
  socketQuery,
  paramKey,
  paramValue,
  chatId,
  name,
  user,
  type,
  workspace,
  channel,
}: Props) => {
  const queryKey = type === 'Channel' ? `channel:${chatId}` : `direct_message:${user.id}`;
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatFetcher({
    apiURL,
    paramKey,
    paramValue,
    pageSize: 10,
    queryKey,
  });
  return <div>ChatMessages</div>;
};

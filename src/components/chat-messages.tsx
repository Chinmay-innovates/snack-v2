import { useChatFetcher } from '@/hooks/use-chat-fetcher';
import { Channel, MessageType, ParamKey, User, Workspace } from '@/types/app';
import { AnimatedDotLoader } from './animated-dot-loader';
import { ChatItem } from './chat-item';
import { format } from '@/lib/utils';

const DATE_FORMAT = 'dd MM yyyy, HH:mm';
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

  if (status === 'pending') return <AnimatedDotLoader />;
  if (status === 'error') return <span>Something went wrong</span>;

  const renderMessages = () =>
    data.pages.map((page) =>
      page.data.map((message) => (
        <ChatItem
          id={message.id}
          key={message.id}
          content={message.content}
          fileUrl={message.file_url}
          currentUser={user}
          timestamp={format(new Date(message.created_at), DATE_FORMAT)}
          isUpdated={message.updated_at !== message.created_at}
          deleted={message.is_deleted}
          user={message.user}
          socketURL={socketURL}
          socketQuery={socketQuery}
          channel={channel}
        />
      )),
    );
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex flex-col-reverse mt-auto">{renderMessages()}</div>
    </div>
  );
};

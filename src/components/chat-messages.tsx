import { useChatFetcher } from '@/hooks/use-chat-fetcher';
import { Channel, MessageType, ParamKey, User, Workspace } from '@/types/app';
import { AnimatedDotLoader } from './animated-dot-loader';
import { ChatItem } from './chat-item';
import { format } from '@/lib/utils';
import { useChatSocketConnection } from '@/hooks/use-chat-socket-connection';
import { IntroBanner } from './intro-banner';
import { Button } from './ui/button';
import { ElementRef, useRef } from 'react';
import { useChatScrollHandler } from '@/hooks/use-chat-scroll-handler';

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
  const chatRef = useRef<ElementRef<'div'>>(null);
  const scrollRef = useRef<ElementRef<'div'>>(null);

  const queryKey = type === 'Channel' ? `channel:${chatId}` : `direct_message:${chatId}`;
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatFetcher({
    apiURL,
    paramKey,
    paramValue,
    pageSize: 10,
    queryKey,
  });

  useChatSocketConnection({
    queryKey,
    addKey: type === 'Channel' ? `${queryKey}:channel-messages` : `direct_messages:post`,
    updateKey:
      type === 'Channel' ? `${queryKey}:channel-messages:update` : `direct_messages:update`,
    paramValue,
  });

  useChatScrollHandler({
    chatRef,
    scrollRef,
    count: data?.pages?.reduce((acc, page) => acc + page.data.length, 0) ?? 0,
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
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <IntroBanner type={type} name={name} createdAt={workspace.created_at} />}
      {hasNextPage && (
        <div className="flex justify-center mb-4">
          {isFetchingNextPage ? (
            <AnimatedDotLoader />
          ) : (
            <Button variant={'link'} onClick={() => fetchNextPage()}>
              Load previous messages
            </Button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">{renderMessages()}</div>
      <div ref={scrollRef} />
    </div>
  );
};

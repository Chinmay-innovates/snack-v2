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
    pageSize: 20,
    queryKey,
  });

  const allMessages = data?.pages.flatMap((page) => page.data) ?? [];

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
    count: allMessages.length,
    channelId: channel?.id || chatId,
  });

  if (status === 'pending') return <AnimatedDotLoader />;
  if (status === 'error') return <span>Something went wrong</span>;

  return (
    <div ref={chatRef}>
      {/* Load Previous */}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <AnimatedDotLoader />
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchNextPage()}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Load previous messages
            </Button>
          )}
        </div>
      )}

      {/* Intro Banner */}
      {!hasNextPage && <IntroBanner type={type} name={name} createdAt={workspace.created_at} />}

      {/* Message List */}
      <div className="flex flex-col gap-4">
        {allMessages.map((message) => (
          <ChatItem
            key={message.id}
            id={message.id}
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
        ))}
      </div>

      {/* Scroll Target */}
      <div ref={scrollRef} />
    </div>
  );
};

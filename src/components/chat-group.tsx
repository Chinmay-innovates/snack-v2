'use client';

import { ChatHeader } from '@/components/chat-header';
import { TextEditor } from '@/components/text-editor';
import { InfoSection } from '@/components/info-section';
import { Sidebar } from '@/components/sidebar';
import { Channel, MessageType, ParamKey, User, Workspace } from '@/types/app';
import { ChatMessages } from './chat-messages';

type Props = {
  type: MessageType;
  socketURL: string;
  apiURL: string;
  headerTitle: string;
  chatId: string;
  socketQuery: Record<string, string>;
  paramKey: ParamKey;
  paramValue: string;
  user: User;
  currentWorkspaceData: Workspace;
  channel: Channel | undefined;
  userWorkspacesData: Workspace[];
  userWorkspaceChannels: Channel[];
  slug: string;
};
export const ChatGroup = ({
  apiURL,
  chatId,
  headerTitle,
  paramKey,
  paramValue,
  socketQuery,
  socketURL,
  type,
  user,
  currentWorkspaceData,
  channel,
  userWorkspaceChannels,
  userWorkspacesData,
  slug,
}: Props) => {
  return (
    <>
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={user}
          userWorkspacesData={userWorkspacesData as Workspace[]}
        />
        <InfoSection
          currentWorkspaceData={currentWorkspaceData}
          userData={user}
          userWorkspaceChannels={userWorkspaceChannels as Channel[]}
          currentChannelId={type === 'Channel' ? channel?.id : undefined}
        />
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={headerTitle} chatId={chatId} user={user} />
          <div className="mt-10">
            <ChatMessages
              user={user}
              name={channel?.name ?? user.name}
              workspace={currentWorkspaceData}
              apiURL={apiURL}
              socketURL={socketURL}
              socketQuery={socketQuery}
              paramKey={paramKey}
              paramValue={paramValue}
              chatId={chatId}
              type={type}
            />
          </div>
        </div>
      </div>

      <div className="m-4">
        <TextEditor
          apiUrl={socketURL}
          type={type}
          userData={user}
          channel={channel}
          workspaceData={currentWorkspaceData}
          recipientId={type === 'DirectMessage' ? chatId : undefined}
        />
      </div>
    </>
  );
};

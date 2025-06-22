import { ChatGroup } from '@/components/chat-group';
import { getUserData } from '@/server/get-user-data';
import { getUserWorkspaceChannels } from '@/server/get-user-workspace-channels';
import { getCurrentWorkspaceData, getUserWorkspaceData } from '@/server/workspaces';
import { Workspace } from '@/types/app';
import { redirect } from 'next/navigation';
import React from 'react';

const DirectMessages = async ({
  params: { chatId, workspaceId },
}: {
  params: { chatId: string; workspaceId: string };
}) => {
  const user = await getUserData();
  if (!user) return redirect('/auth');

  const [userWorkspacesData] = await getUserWorkspaceData(user.workspaces!);
  const [currWorkspaceData] = await getCurrentWorkspaceData(workspaceId);

  const userWorkspaceChannels = await getUserWorkspaceChannels(workspaceId, user.id);
  const currentChannelData = userWorkspaceChannels.find((channel) => channel.id === chatId);

  return (
    <div className="hidden md:block">
      <ChatGroup
        user={user}
        type="DirectMessage"
        channel={currentChannelData}
        currentWorkspaceData={currWorkspaceData}
        userWorkspacesData={userWorkspacesData as Workspace[]}
        userWorkspaceChannels={userWorkspaceChannels}
        chatId={chatId}
        slug={workspaceId}
        socketURL={'/api/web-socket/direct-messages'}
        socketQuery={{
          channelId: currentChannelData?.id!,
          workspaceId: currWorkspaceData.id,
          recipientId: chatId,
        }}
        apiURL={'/api/direct-messages'}
        headerTitle={currentChannelData?.name || 'Direct Messages'}
        paramKey="recipientId"
        paramValue={chatId}
      />
    </div>
  );
};

export default DirectMessages;

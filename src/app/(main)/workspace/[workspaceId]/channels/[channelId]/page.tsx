import { redirect } from 'next/navigation';

import { getUserData } from '@/server/get-user-data';
import { getCurrentWorkspaceData, getUserWorkspaceData } from '@/server/workspaces';
import { getUserWorkspaceChannels } from '@/server/get-user-workspace-channels';
import { ChatGroup } from '@/components/chat-group';
import { Workspace } from '@/types/app';

const Channel = async ({
  params,
}: {
  params: {
    channelId: string;
    workspaceId: string;
  };
}) => {
  const user = await getUserData();

  if (!user) return redirect('/auth');

  const [userWorkspacesData, userWorkspaceError] = await getUserWorkspaceData(user.workspaces!);

  const [currentWorkspaceData, currentWorkspaceError] = await getCurrentWorkspaceData(
    params.workspaceId,
  );

  const userWorkspaceChannels = await getUserWorkspaceChannels(currentWorkspaceData.id, user.id);

  const channel = userWorkspaceChannels.find((channel) => channel.id === params.channelId);
  if (!channel) return redirect('/');

  return (
    <div className="hidden md:block">
      <ChatGroup
        type="Channel"
        user={user}
        channel={channel}
        currentWorkspaceData={currentWorkspaceData}
        slug={params.workspaceId}
        chatId={params.channelId}
        userWorkspaceChannels={userWorkspaceChannels}
        socketURL="/api/web-socket/messages"
        socketQuery={{
          channelId: channel.id,
          workspaceId: currentWorkspaceData,
        }}
        apiURL="/api/messages"
        headerTitle={channel.name}
        paramKey="channelId"
        paramValue={params.channelId}
        userWorkspacesData={userWorkspacesData as Workspace[]}
      />
    </div>
  );
};

export default Channel;

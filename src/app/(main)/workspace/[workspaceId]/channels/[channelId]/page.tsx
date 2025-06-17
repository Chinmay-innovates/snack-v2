import { redirect } from 'next/navigation';

import { getUserData } from '@/server/get-user-data';
import { getCurrentWorkspaceData, getUserWorkspaceData } from '@/server/workspaces';
import { getUserWorkspaceChannels } from '@/server/get-user-workspace-channels';
import { Typography } from '@/components/ui/typography';
import { ChatHeader } from '@/components/chat-header';
import { TextEditor } from '@/components/text-editor';
import { InfoSection } from '@/components/info-section';
import { Sidebar } from '@/components/sidebar';
import { Workspace as WorkspaceType } from '@/types/app';

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
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={user}
          userWorkspacesData={userWorkspacesData as WorkspaceType[]}
        />
        <InfoSection
          currentWorkspaceData={currentWorkspaceData}
          userData={user}
          userWorkspaceChannels={userWorkspaceChannels}
          currentChannelId={params.channelId}
        />
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={channel.name} />
          <div className="mt-10">
            <Typography text="Chat Content" variant="h3" />
          </div>
        </div>
      </div>

      <div className="m-4">
        <TextEditor
          apiUrl={''}
          type={'Channel'}
          workspaceData={currentWorkspaceData}
          userData={user}
          channel={channel}
        />
      </div>
    </div>
  );
};

export default Channel;

import { redirect } from 'next/navigation';

import { InfoSection } from '@/components/info-section';
import { Sidebar } from '@/components/sidebar';
import { getUserData } from '@/server/get-user-data';
import { Workspace as WorkspaceType } from '@/types/app';
import { getCurrentWorkspaceData, getUserWorkspaceData } from '@/server/workspaces';
import { getUserWorkspaceChannels } from '@/server/get-user-workspace-channels';
import { Typography } from '@/components/ui/typography';

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

  return (
    <div className="hidden md:block">
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
      <div className="p-2">
        <Typography text="Channel" variant="h3" />
      </div>
    </div>
  );
};

export default Channel;

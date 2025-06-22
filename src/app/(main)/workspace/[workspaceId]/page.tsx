import { EmptyScreen } from '@/components/empty-screen';
import { InfoSection } from '@/components/info-section';
import { Sidebar } from '@/components/sidebar';
import { getUserData } from '@/server/get-user-data';
import { getUserWorkspaceChannels } from '@/server/get-user-workspace-channels';
import { getCurrentWorkspaceData, getUserWorkspaceData } from '@/server/workspaces';
import { Workspace as WorkspaceType } from '@/types/app';
import { redirect } from 'next/navigation';

const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
  const user = await getUserData();

  if (!user) return redirect('/auth');

  const [userWorkspacesData, userWorkspaceError] = await getUserWorkspaceData(user.workspaces!);

  const [currentWorkspaceData, currentWorkspaceError] = await getCurrentWorkspaceData(
    params.workspaceId,
  );

  const userWorkspaceChannels = await getUserWorkspaceChannels(currentWorkspaceData.id, user.id);

  // if (userWorkspaceChannels.length) {
  //   return redirect(`/workspace/${params.workspaceId}/channels/${userWorkspaceChannels[0].id}`);
  // }

  return (
    <>
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
          currentChannelId={undefined}
        />
        <EmptyScreen
          userId={user.id}
          workspaceId={currentWorkspaceData.id}
          workspaceName={currentWorkspaceData.name}
        />
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Workspace;

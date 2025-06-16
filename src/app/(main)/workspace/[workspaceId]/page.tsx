import { Sidebar } from '@/components/sidebar';
import { getUserData } from '@/server/get-user-data';
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

  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={user}
          userWorkspacesData={userWorkspacesData as WorkspaceType[]}
        />
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Workspace;

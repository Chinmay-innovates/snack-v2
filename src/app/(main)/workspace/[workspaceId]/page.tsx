import { getUserData } from '@/server/get-user-data';
import { getcurrentWorkspaceData, getUserWorkspaceData } from '@/server/workspaces';
import { redirect } from 'next/navigation';

const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
  const user = await getUserData();

  if (!user) return redirect('/auth');

  const [userWorkspaceData, userWorkspaceError] = await getUserWorkspaceData(user.workspaces!);

  const [currentWorkspaceData, currentWorkspaceError] = await getcurrentWorkspaceData(
    params.workspaceId,
  );

  return (
    <div className="text-black p-2">
      Workspace&nbsp;
      <strong>{params.workspaceId}</strong>
    </div>
  );
};

export default Workspace;

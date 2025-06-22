import { supabaseServerClient } from '@/supabase/supabase-server';
import { getUserData } from './get-user-data';
import { addMemberToWorkspace } from './add-member-to-workspace';
import { updateUserWorkspace } from './update-user-workspace';

const getUserWorkspaceData = async (workspaceIds: Array<string>) => {
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase.from('workspaces').select('*').in('id', workspaceIds);

  return [data, error];
};

const getCurrentWorkspaceData = async (workspaceId: string) => {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase
    .from('workspaces')
    .select('*, channels(*)')
    .eq('id', workspaceId)
    .single();

  if (error) {
    return [null, error];
  }
  const { members } = data;
  const memeberDetails = Promise.all(
    members.map(async (memberId: string) => {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', memberId)
        .single();
      if (userError) {
        console.log(`Error fetching data for member: ${memberId}`, userError);
        return null;
      }
      return userData;
    }),
  );

  data.members = (await memeberDetails).filter((member) => member !== null);

  return [data, error];
};

const workspaceInvite = async (inviteCode: string) => {
  const supabase = await supabaseServerClient();
  const user = await getUserData();

  if (!user) {
    return console.log('No user data');
  }

  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('invite_code', inviteCode)
    .single();

  if (error) {
    return console.log('Error fetching workspace invite', error);
  }

  const isUserMember = data.members.includes(user.id);

  if (isUserMember) {
    return console.log('User is already a member of the workspace');
  }

  if (data.super_admin === user.id) {
    return console.log('User is the super admin of the workspace');
  }

  await addMemberToWorkspace(user.id, data.id);
  await updateUserWorkspace(user.id, data.id);
};

export { getUserWorkspaceData, getCurrentWorkspaceData, workspaceInvite };

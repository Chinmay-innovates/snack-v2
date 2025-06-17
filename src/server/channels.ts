'use server';

import { supabaseServerClient } from '@/supabase/supabase-server';
import { getUserData } from './get-user-data';

export const createChannel = async ({
  name,
  workspaceId,
  userId,
}: {
  workspaceId: string;
  name: string;
  userId: string;
}) => {
  const supabase = await supabaseServerClient();
  const user = await getUserData();

  if (!user) {
    return { error: 'No user data' };
  }

  const { error, data: channels } = await supabase
    .from('channels')
    .insert({
      name,
      user_id: userId,
      workspace_id: workspaceId,
    })
    .select('*');

  if (error) {
    return { error: 'Insert Error' };
  }

  //   Update channel members array
  const [_uc, updateChannelMembersError] = await updateChannelMembers(channels[0].id, userId);

  if (updateChannelMembersError) {
    return { error: 'Update members channel error' };
  }

  //   Add channel to user's channels array
  const [_ac, addChannelToUserError] = await addChannelToUser(user.id, channels[0].id);

  if (addChannelToUserError) {
    return { error: 'Add channel to user error' };
  }

  //   Add channel to workspace's channels array
  const [_uw, updateWorkspaceChannelError] = await updateWorkspaceChannel(
    channels[0].id,
    workspaceId,
  );

  if (updateWorkspaceChannelError) {
    return { error: 'Update workspace channel error' };
  }
};

export const addChannelToUser = async (userId: string, channelId: string) => {
  const supabase = await supabaseServerClient();

  const { data: addChannel, error: addChannelError } = await supabase.rpc('update_user_channels', {
    user_id: userId,
    channel_id: channelId,
  });

  return [addChannel, addChannelError];
};

export const updateChannelMembers = async (channelId: string, userId: string) => {
  const supabase = await supabaseServerClient();

  const { data: updatedChannel, error: updateError } = await supabase.rpc(
    'update_channel_members',
    {
      new_member: userId,
      channel_id: channelId,
    },
  );

  return [updatedChannel, updateError];
};

const updateWorkspaceChannel = async (channelId: string, workspaceId: string) => {
  const supabase = await supabaseServerClient();

  const { data: updatedWorkspace, error: updateError } = await supabase.rpc(
    'add_channel_to_workspace',
    {
      channel_id: channelId,
      workspace_id: workspaceId,
    },
  );

  return [updatedWorkspace, updateError];
};

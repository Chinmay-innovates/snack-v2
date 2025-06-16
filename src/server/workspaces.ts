import { supabaseServerClient } from '@/supabase/supabase-server';

const getUserWorkspaceData = async (workspaceIds: Array<string>) => {
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase.from('workspaces').select('*').in('id', workspaceIds);

  return [data, error];
};

const getCurrentWorkspaceData = async (workspaceId: string) => {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('id', workspaceId)
    .single();
  return [data, error];
};

export { getUserWorkspaceData, getCurrentWorkspaceData };

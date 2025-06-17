import { getUserDataPages } from '@/server/get-user-data';
import { supabaseServerClientPages } from '@/supabase/supabase-server-pages';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const user = await getUserDataPages(req, res);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { channelId, workspaceId } = req.query;

    if (!channelId || !workspaceId) {
      return res.status(400).json({ error: 'Missing channelId or workspaceId' });
    }

    const { content, fileUrl } = req.body;

    if (!content && !fileUrl) {
      return res.status(400).json({ error: 'Bad request' });
    }

    const supabase = supabaseServerClientPages(req, res);

    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .select('*')
      .eq('id', channelId)
      .contains('members', [user.id]);

    if (!channel?.length || channelError) {
      return res.status(403).json({ error: 'Channel not found' });
    }

    const { data, error: messageError } = await supabase
      .from('messages')
      .insert({
        content,
        user_id: user.id,
        file_url: fileUrl,
        channel_id: channelId,
        workspace_id: workspaceId,
      })
      .select('*, user: user_id(*)')
      .order('created_at', { ascending: true })
      .single();

    if (messageError) {
      console.log('MESSAGE WS ERROR', messageError);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ message: 'Message created', data });
  } catch (error) {
    console.log('MESSAGE WS ERROR', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

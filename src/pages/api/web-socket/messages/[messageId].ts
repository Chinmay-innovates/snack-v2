import { getChannelMessageUpdateEvent } from '@/lib/utils';
import { getUserDataPages } from '@/server/get-user-data';
import { supabaseServerClientPages } from '@/supabase/supabase-server-pages';
import { SocketIOApiResponse } from '@/types/app';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: SocketIOApiResponse) {
  if (!['DELETE', 'PATCH'].includes(req.method!)) {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await getUserDataPages(req, res);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { messageId, channelId, workspaceId } = req.query as Record<string, string>;

    if (!messageId || !channelId || !workspaceId) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const { content } = req.body;

    const supabase = supabaseServerClientPages(req, res);
    const { data: message, error } = await supabase
      .from('messages')
      .select('*, user: user_id (*)')
      .eq('id', messageId)
      .single();

    if (error || !message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const isOwner = message.user_id === user.id;
    const isAdmin = user.type === 'admin';
    const isRegulator = user.type === 'regulator';

    const canEditMessage = isOwner || !message.is_deleted;

    if (!canEditMessage) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (req.method === 'PATCH') {
      if (!isOwner) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      await updateMessageContent(supabase, messageId, content);
    } else if (req.method === 'DELETE') {
      await deleteMessage(supabase, messageId);
    }

    const { data: updatedMessage, error: messageError } = await supabase
      .from('messages')
      .select('*, user: user_id (*)')
      .order('created_at', { ascending: true })
      .eq('id', messageId)
      .single();

    if (messageError || !updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const event = getChannelMessageUpdateEvent(channelId);
    res.socket.server.io.emit(event, updatedMessage);

    return res.status(200).json({ message: updatedMessage });
  } catch (error) {
    console.log('MESSAGE ID ERROR: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateMessageContent(supabase: SupabaseClient, messageId: string, content: string) {
  await supabase
    .from('messages')
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', messageId)
    .select('*, user: user_id (*)')
    .single();
}

async function deleteMessage(supabase: SupabaseClient, messageId: string) {
  await supabase
    .from('messages')
    .update({
      content: 'This message has been deleted',
      file_url: null,
      is_deleted: true,
    })
    .eq('id', messageId)
    .select('*, user: user_id (*)')
    .single();
}

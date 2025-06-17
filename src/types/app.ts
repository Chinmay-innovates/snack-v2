import { Database } from './supabase';
import { NextApiResponse } from 'next';
import { Socket, Server as NetServer } from 'net';
import { Server as SocketIOServer } from 'socket.io';

export type User = Database['public']['Tables']['users']['Row'];
export type Workspace = Database['public']['Tables']['workspaces']['Row'];
export type Channel = Database['public']['Tables']['channels']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type SocketIOApiResponse = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
export type ParamKey = 'channelId' | 'recipientId';
export type MessageType = 'Channel' | 'DirectMessage';
export type MessageWithUser = Message & { user: User };

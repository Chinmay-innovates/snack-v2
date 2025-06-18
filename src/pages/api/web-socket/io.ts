import { SocketIOApiResponse } from '@/types/app';
import { Server as NetServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { NextApiRequest } from 'next';

const initializSocketServer = (httpServer: NetServer): SocketServer => {
  const path = '/api/web-socket/io';
  return new SocketServer(httpServer, {
    path,
    addTrailingSlash: false,
  });
};

const handler = async (req: NextApiRequest, res: SocketIOApiResponse) => {
  if (!res.socket.server.io) {
    res.socket.server.io = initializSocketServer(res.socket.server.io);
  }

  res.end();
};

export default handler;

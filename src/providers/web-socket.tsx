'use client';

import { Socket, io as ClientIO } from 'socket.io-client';
import React, { useContext } from 'react';

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};
const SocketContext = React.createContext<SocketContextType>({
  isConnected: false,
  socket: null,
});
export const useSocket = () => useContext(SocketContext);
export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    const siteURL = process.env.NEXT_PUBLIC_SITE_URL!;
    if (!siteURL) {
      return console.log('NEXT_PUBLIC_SITE_URL is not set in .env.local file');
    }

    const socketInstance = ClientIO(siteURL, {
      path: '/api/web-socket/io',
      addTrailingSlash: false,
    });

    socketInstance.on('connect', () => setIsConnected(true));
    socketInstance.on('disconnect', () => setIsConnected(false));
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
  );
};

WebSocketProvider.displayName = 'WebSocketProvider';

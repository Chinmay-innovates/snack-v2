import { useSocket } from '@/providers/web-socket';
import { Message, MessageWithUser } from '@/types/app';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

type Props = {
  addKey: string;
  updateKey: string;
  queryKey: string;
  paramValue: string;
};
export const useChatSocketConnection = ({ addKey, paramValue, queryKey, updateKey }: Props) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const handleUpdateMessage = (message: MessageWithUser) => {
    queryClient.setQueryData([queryKey, paramValue], (prev: any) => {
      if (!prev || !prev.pages || !prev.pages.length) {
        return prev;
      }

      const newData = prev.pages.map((page: any) => ({
        ...page,
        data: page.data.map((item: MessageWithUser) => {
          if (item.id === message.id) {
            return message;
          }
          return item;
        }),
      }));

      return {
        ...prev,
        pages: newData,
      };
    });
  };

  const handleNewMessage = (message: MessageWithUser) => {
    queryClient.setQueryData([queryKey, paramValue], (prev: any) => {
      if (!prev || !prev.pages || !prev.pages.length) {
        return prev;
      }

      const newPages = [...prev.pages];
      newPages[0] = {
        ...newPages[0],
        data: [message, ...newPages[0].data],
      };

      return {
        ...prev,
        pages: newPages,
      };
    });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(addKey, handleNewMessage);
    socket.on(updateKey, handleUpdateMessage);

    return () => {
      socket.off(addKey, handleNewMessage);
      socket.off(updateKey, handleUpdateMessage);
    };
  }, [socket, addKey, updateKey, queryClient, queryKey]);
};

'use client';

import { User } from '@/types/app';
import { useEffect, useState } from 'react';
import { AnimatedDotLoader } from './animated-dot-loader';
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
  RoomContext,
  ControlBar,
  useTracks,
  GridLayout,
  ParticipantTile,
} from '@livekit/components-react';
import { Room, Track } from 'livekit-client';

import '@livekit/components-styles';

type Props = {
  chatId: string;
  user: User;
};

export const VideoChat = ({ chatId, user }: Props) => {
  const [token, setToken] = useState<string>('');
  const [roomInstance] = useState(
    () =>
      new Room({
        // Optimize video quality for each participant's screen
        adaptiveStream: true,
        // Enable automatic audio/video quality optimization
        dynacast: true,
      }),
  );

  useEffect(() => {
    const name = user.name || user.email;
    let mounted = true;
    (async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
        const data = await resp.json();

        if (!mounted) return;

        if (data.token) {
          await roomInstance.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL!, data.token);
        }
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      mounted = false;
      roomInstance.disconnect();
    };
  }, [chatId, user.email, user.name]);

  if (token === '') {
    return <AnimatedDotLoader />;
  }
  return (
    <LiveKitRoom
      token={token}
      video={true}
      audio={true}
      connect={true}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <VideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
};

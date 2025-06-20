'use client';

import { FC, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaPlus } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useColorPrefrences } from '@/providers/color-preferences';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Channel, User, Workspace } from '@/types/app';
import { Typography } from './ui/typography';
import { CreateChannelDialog } from './create-channel-dialog';
export const InfoSection: FC<{
  userData: User;
  currentWorkspaceData: Workspace;
  userWorkspaceChannels: Channel[];
  currentChannelId: string | undefined;
}> = ({ userData, currentWorkspaceData, userWorkspaceChannels, currentChannelId }) => {
  const { color } = useColorPrefrences();
  const [isChannelCollapsed, setIsChannelCollapsed] = useState(true);
  const [isDirectMessageCollapsed, setIsDirectMessageCollapsed] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  let backgroundColor = 'bg-primary-light';
  if (color === 'green') {
    backgroundColor = 'bg-green-900';
  } else if (color === 'blue') {
    backgroundColor = 'bg-blue-900';
  }

  let secondayBg = 'hover:bg-primary-dark';
  if (color === 'green') {
    secondayBg = 'hover:bg-green-700';
  } else if (color === 'blue') {
    secondayBg = 'hover:bg-blue-700';
  }

  const navigateToChannel = (channelId: string) => {
    const url = `/workspace/${currentWorkspaceData.id}/channels/${channelId}`;
    router.push(url);
  };

  const navigateToDirectMessage = (memberId: string) => {
    const url = `/workspace/${currentWorkspaceData.id}/direct-message/${memberId}`;
    router.push(url);
  };

  return (
    <div
      className={cn(
        'fixed text-white left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-63px)] z-20 flex flex-col items-center',
        backgroundColor,
      )}
    >
      <div className="w-full flex flex-col gap-2 p-3">
        <div>
          <Collapsible
            open={isChannelCollapsed}
            onOpenChange={() => setIsChannelCollapsed((prevState) => !prevState)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isChannelCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                <Typography variant="p" text="Channels" className="font-bold" />
              </CollapsibleTrigger>
              <div className={cn('cursor-pointer p-2 rounded-full', secondayBg)}>
                <FaPlus onClick={() => setDialogOpen(true)} />
              </div>
            </div>
            <CollapsibleContent>
              {userWorkspaceChannels.map((channel) => {
                const isActive = currentChannelId === channel.id;
                const hoverStyles =
                  isActive && secondayBg ? 'hover:bg-[#f4f4f4] hover:text-[#1d1d1d]' : '';

                return (
                  <Typography
                    key={channel.id}
                    variant="p"
                    text={`# ${channel.name}`}
                    onClick={() => navigateToChannel(channel.id)}
                    className={cn(
                      'px-2 py-1 rounded-sm cursor-pointer',
                      secondayBg,
                      isActive && 'bg-[#f4f4f4] text-[#1d1d1d]',
                      hoverStyles,
                    )}
                  />
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div>
          <Collapsible
            open={isDirectMessageCollapsed}
            onOpenChange={() => setIsDirectMessageCollapsed((prevState) => !prevState)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isDirectMessageCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                <Typography variant="p" text="Direct messages" className="font-bold" />
              </CollapsibleTrigger>
              <div className={cn('cursor-pointer p-2 rounded-full', secondayBg)}>
                <FaPlus />
              </div>
            </div>
            <CollapsibleContent>
              {/* {currentWorkspaceData?.members?.map((member) => {
                return (
                  <Typography
                    key={member.id}
                    variant="p"
                    text={member.name || member.email}
                    className={cn('px-2 py-1 rounded-sm cursor-pointer', secondayBg)}
                    onClick={() => navigateToDirectMessage(member.id)}
                  />
                );
              })} */}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <CreateChannelDialog
        setDialogOpen={setDialogOpen}
        dialogOpen={dialogOpen}
        workspaceId={currentWorkspaceData.id}
        userId={userData.id}
      />
    </div>
  );
};

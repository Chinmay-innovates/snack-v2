import { cn } from '@/lib/utils';
import { useColorPrefrences } from '@/providers/color-preferences';
import { Channel, Workspace } from '@/types/app';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Search } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { MdOutlineAdminPanelSettings, MdOutlineAssistantPhoto } from 'react-icons/md';
import { Button } from './ui/button';
import { showToast } from '@/lib/toast';
import { addChannelToUser, updateChannelMembers, updateChannelRegulators } from '@/server/channels';

type Props = {
  currentWorkspaceData: Workspace;
  channel?: Channel;
  loggedInUserId: string;
};

export const SearchBar = ({ currentWorkspaceData, loggedInUserId, channel }: Props) => {
  const { color } = useColorPrefrences();
  const router = useRouter();

  let backgroundColor = ' bg-[#7A4A7F] dark:bg-primary-light';
  if (color === 'green') {
    backgroundColor = ' bg-green-200 dark:bg-green-900';
  } else if (color === 'blue') {
    backgroundColor = ' bg-blue-200 dark:bg-blue-900';
  }

  const isChannelMember = (memberId: string) => {
    return channel?.members?.includes(memberId) ?? false;
  };

  const isRegulator = (memberId: string) => {
    return channel?.regulators?.includes(memberId) ?? false;
  };

  const isChannelCreator = (memberId: string) => {
    return channel?.user_id === memberId;
  };

  const addUserToChannel = async (userId: string, channelId: string) => {
    // Add user to channel
    await updateChannelMembers(channelId, userId);

    // Add channel to user's channels
    await addChannelToUser(userId, channelId);

    router.refresh();
    showToast({
      message: 'User added to channel',
      description: 'They can now view and send messages.',
    });
  };

  const makeUserRegulator = async (userId: string, channelId: string) => {
    await updateChannelRegulators(userId, channelId);
    router.refresh();
    showToast({
      message: 'User is now a regulator',
      description: 'They have been granted regulatory permissions.',
    });
  };

  return (
    <div className={cn('absolute h-10 w-[700px] px-3 top-2 rounded-md', backgroundColor)}>
      <Popover>
        <PopoverTrigger className="flex items-center space-x-2 size-full">
          <Search className="text-black dark:text-white" size={20} />
          <span className="text-sm text-black dark:text-white">
            Search #{channel?.name ?? 'channel'}
          </span>
        </PopoverTrigger>
        <PopoverContent className=" w-[700px]">
          <ScrollArea className="rounded-md max-h-96">
            {currentWorkspaceData.members?.map((member) => {
              return (
                <div key={member.id} className="flex items-center my-2 justify-between">
                  <div className="flex items-center p-2">
                    <span className="mr-2 text-sm text-black dark:text-white">
                      {member.name ?? member.email}
                    </span>
                    {isRegulator(member.id) && <MdOutlineAssistantPhoto className="size-5" />}
                    {isChannelCreator(member.id) && (
                      <MdOutlineAdminPanelSettings className="size-5" />
                    )}
                  </div>

                  <div className="flex gap-x-2">
                    {loggedInUserId !== member.id &&
                      !isRegulator(member.id) &&
                      isChannelMember(member.id) && (
                        <Button
                          className="text-[10px]"
                          size="sm"
                          variant="destructive"
                          onClick={() => makeUserRegulator(member.id, channel?.id!)}
                        >
                          Assign Regulator
                        </Button>
                      )}

                    {!isChannelMember(member.id) && (
                      <Button
                        className="text-[10px]"
                        size="sm"
                        disabled={isChannelMember(member.id)}
                        onClick={() => addUserToChannel(member.id, channel?.id!)}
                      >
                        Add to Channel
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

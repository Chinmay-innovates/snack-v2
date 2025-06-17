import { IoMdHeadset } from 'react-icons/io';

import { Typography } from './ui/typography';
import { User } from '@/types/app';

type Props = {
  title: string;
  chatId: string;
  user: User;
};
export const ChatHeader = ({ title, chatId, user }: Props) => {
  return (
    <div className="absolute z-20 h-10 top-0 left-0 w-full">
      <div className="h-10 flex items-center justify-between px-4 fixed md:w-[calc(100%-305px)] lg:w-[calc(100%-447px)] bg-white dark:bg-neutral-800 border-b border-b-white/30 shadow-md">
        <Typography text={`# ${title}`} variant="h4" />
        <IoMdHeadset className="text-primary cursor-pointer" size={24} />
      </div>
    </div>
  );
};

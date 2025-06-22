import { format } from '@/lib/utils';
import { MessageType } from '@/types/app';
import { MessageSquareText, Hash, Calendar } from 'lucide-react';

type Props = {
  type: MessageType;
  name: string | null;
  createdAt: string;
};

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition-colors group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700">
    {children}
  </div>
);

export const IntroBanner = ({ createdAt, name = '', type }: Props) => {
  const formattedDate = createdAt ? format(new Date(createdAt), 'dd MM yyyy') : null;

  const channelMessage = formattedDate ? `Created ${formattedDate}` : `Welcome to #${name}`;
  const channelDescription = `This is the beginning of the #${name} channel. Collaborate, share, and make decisions together.`;
  const directMessage = `This is your private conversation with ${name}. Messages stay between you two.`;

  return (
    <div className="mb-8 px-6">
      <div className="group">
        <div className="flex items-center gap-4 mb-4">
          {type === 'Channel' ? (
            <IconWrapper>
              <Hash className="text-zinc-600 dark:text-zinc-400" size={20} />
            </IconWrapper>
          ) : (
            <div className="relative">
              <IconWrapper>
                <MessageSquareText className="text-zinc-600 dark:text-zinc-400" size={20} />
              </IconWrapper>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900" />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              {type === 'Channel' ? name : `Say hi to ${name}`}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {type === 'Channel' && formattedDate && (
                <>
                  <Calendar size={14} />
                  <span>{channelMessage}</span>
                </>
              )}
              {type !== 'Channel' && (
                <>
                  <div className="size-1.5 bg-gray-500 rounded-full" />
                  <span>Direct message</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="ml-14">
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
            {type === 'Channel' ? channelDescription : directMessage}
          </p>
        </div>

        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent" />
      </div>
    </div>
  );
};

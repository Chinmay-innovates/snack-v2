import { format } from '@/lib/utils';
import { MessageType } from '@/types/app';
import { MessageSquareText, Sparkles } from 'lucide-react';

type Props = {
  type: MessageType;
  name: string | null;
  createdAt: string;
};

export const IntroBanner = ({ createdAt, name, type }: Props) => {
  const formattedDate = createdAt ? format(new Date(createdAt), 'dd MMMM yyyy') : null;

  const channelMessage = createdAt
    ? `channel created on ${formattedDate}.`
    : `Welcome to #${name}!`;

  const channelDescription = `This is the very beginning of the ${name} channel. Hold meetings, share docs, and make decisions together.`;

  const directMessage = `💬 This is the start of your conversation with ${name}. Messages here stay between the two of you — feel free to share ideas, files, or just say hey.`;

  return (
    <div className="mb-6 px-4 py-3 bg-zinc-100 dark:bg-zinc-800/40 rounded-2xl border border-zinc-300 dark:border-zinc-700">
      {type === 'Channel' ? (
        <div className="flex items-start gap-3">
          <Sparkles className="text-indigo-500 mt-1" size={20} />
          <div>
            <p className="text-zinc-900 dark:text-white font-semibold text-base">
              Welcome to <span className="text-indigo-600">#{name}</span>
            </p>
            {createdAt && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{channelMessage}</p>
            )}
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{channelDescription}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <MessageSquareText className="text-blue-500 mt-1" size={20} />
          <div>
            <p className="text-zinc-900 dark:text-white font-semibold text-base">
              Start of your chat with <span className="text-blue-600">{name}</span>
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{directMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

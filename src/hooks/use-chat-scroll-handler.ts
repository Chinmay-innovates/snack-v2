import { useEffect, useRef, useState } from 'react';

type Props = {
  chatRef: React.RefObject<HTMLDivElement>;
  scrollRef: React.RefObject<HTMLDivElement>;
  count: number;
  channelId: string; // To detect new chat/channel
};

export const useChatScrollHandler = ({ chatRef, scrollRef, count, channelId }: Props) => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const prevCountRef = useRef<number>(count);

  useEffect(() => {
    const chatEl = chatRef.current;
    const bottomEl = scrollRef.current;
    if (!chatEl || !bottomEl) return;

    // On first load or channel change, scroll to bottom
    setTimeout(() => {
      bottomEl.scrollIntoView({ behavior: 'auto' });
    }, 0);
    setHasInitialized(true);
    prevCountRef.current = count;
  }, [channelId]);

  useEffect(() => {
    const chatEl = chatRef.current;
    const bottomEl = scrollRef.current;
    if (!chatEl || !bottomEl) return;

    const wasNearBottom = chatEl.scrollHeight - chatEl.scrollTop - chatEl.clientHeight <= 100;

    const messageIncreased = count > prevCountRef.current;
    prevCountRef.current = count;

    // Only scroll if new message and user was already at the bottom
    if (hasInitialized && wasNearBottom && messageIncreased) {
      setTimeout(() => {
        bottomEl.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [count, hasInitialized, chatRef, scrollRef]);
};

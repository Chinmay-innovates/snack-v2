import { useEffect, useState } from 'react';

type Props = {
  chatRef: React.RefObject<HTMLDivElement>;
  scrollRef: React.RefObject<HTMLDivElement>;
  count: number;
};

export const useChatScrollHandler = ({ chatRef, scrollRef, count }: Props) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const chatEl = chatRef.current;
    const bottomEl = scrollRef.current;

    if (!chatEl || !bottomEl) return;

    const isNearBottom = () => {
      const distanceFromBottom = chatEl.scrollHeight - chatEl.scrollTop - chatEl.clientHeight;
      return distanceFromBottom <= 100;
    };

    // Always scroll to bottom on first load
    if (!hasInitialized) {
      setHasInitialized(true);
      bottomEl.scrollIntoView({ behavior: 'auto' });
      return;
    }

    // Scroll if user is near bottom
    if (isNearBottom()) {
      setTimeout(() => {
        bottomEl.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [count, chatRef, scrollRef, hasInitialized]);
};

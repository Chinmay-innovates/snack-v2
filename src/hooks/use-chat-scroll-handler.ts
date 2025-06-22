import React, { useEffect } from 'react';

type Props = {
  chatRef: React.RefObject<HTMLDivElement>;
  scrollRef: React.RefObject<HTMLDivElement>;
  count: number;
};
export const useChatScrollHandler = ({ chatRef, scrollRef, count }: Props) => {
  const [hasInitialized, setHasInitialized] = React.useState(false);

  useEffect(() => {
    const topDiv = chatRef.current;
    const bottomDiv = scrollRef.current;

    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        setHasInitialized(true);
      }

      if (!topDiv) return false;

      const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;

      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [scrollRef, chatRef, hasInitialized, count]);
};

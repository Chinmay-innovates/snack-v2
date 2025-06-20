'use client';

import { useEffect, useState } from 'react';
import { Progress } from './ui/progress';

export const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 1) % 101);
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <Progress
      className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full animate-loading-bar"
      value={progress}
      max={100}
    />
  );
};

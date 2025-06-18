export const AnimatedDotLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <span className="sr-only">Loading...</span>
      <div className="size-3 md:size-4 bg-gray-900 dark:bg-gray-100 rounded-full animate-dot-bounce [animation-delay:-0.32s]" />
      <div className="size-3 md:size-4 bg-gray-900 dark:bg-gray-100 rounded-full animate-dot-bounce [animation-delay:-0.16s]" />
      <div className="size-3 md:size-4 bg-gray-900 dark:bg-gray-100 rounded-full animate-dot-bounce" />
    </div>
  );
};

import { FC, ReactNode } from 'react';

import { ThemeProvider } from '@/providers/theme-provider';
import { ColorPrefrencesProvider } from '@/providers/color-preferences';
import { MainContent } from '@/components/main-layout';
import { WebSocketProvider } from '@/providers/web-socket';

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <WebSocketProvider>
        <ColorPrefrencesProvider>
          <MainContent>{children}</MainContent>
        </ColorPrefrencesProvider>
      </WebSocketProvider>
    </ThemeProvider>
  );
};

export default MainLayout;

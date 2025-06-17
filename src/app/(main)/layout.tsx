import { FC, ReactNode } from 'react';

import { ThemeProvider } from '@/providers/theme-provider';
import { ColorPrefrencesProvider } from '@/providers/color-preferences';
import { MainContent } from '@/components/main-layout';

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ColorPrefrencesProvider>
        <MainContent>{children}</MainContent>
      </ColorPrefrencesProvider>
    </ThemeProvider>
  );
};

export default MainLayout;

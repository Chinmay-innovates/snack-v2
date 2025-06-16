import type { Metadata } from 'next';
import { Lato } from 'next/font/google';

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';

import '@/styles/globals.css';
import { Toaster } from 'sonner';

const font = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Snack',
  description:
    "Snack is a cloud-based messaging app that helps teams communicate and collaborate. It's designed to help organizations work more flexibly and inclusively, and can be used by teams of all sizes.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <Toaster duration={5000} />
        {children}
      </body>
    </html>
  );
}

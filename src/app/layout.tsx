import type { Metadata } from 'next';
import { Lato } from 'next/font/google';

import '@/styles/globals.css';

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
      <body className={font.className}>{children}</body>
    </html>
  );
}

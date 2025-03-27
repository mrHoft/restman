import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Footer from '~/components/footer/footer';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
import { Modal } from '~/components/modal/modal';

import '~/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Restman',
  description: 'REST api testing tool',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`body ${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Footer />
        <Loader />
        <Message />
        <Modal />
      </body>
    </html>
  );
}

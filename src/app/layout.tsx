import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Backdop } from '~/components/backdop/backdop';
import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header/header';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
import { Modal } from '~/components/modal/modal';
import { createClient } from '~/utils/supabase/server';

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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // TODO: move to middleware
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={`body ${geistSans.variable} ${geistMono.variable}`}>
        <Backdop />
        <Header user={user} />
        <main className="main">{children}</main>
        <Footer />
        <Loader />
        <Message />
        <Modal />
      </body>
    </html>
  );
}

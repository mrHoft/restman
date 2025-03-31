import type { Metadata } from 'next';
import { Backdop } from '~/components/backdop/backdop';
import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header/header';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
import { Modal } from '~/components/modal/modal';

import '~/styles/globals.css';

export const metadata: Metadata = {
  title: 'Restman',
  description: 'REST api testing tool',
  icons: {
    icon: '/logo.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  return (
    <html lang={'en'}>
      <body className="body">
        <Backdop />
        <Header user={null} />
        <main className="main">{children}</main>
        <Footer />
        <Loader />
        <Message />
        <Modal />
      </body>
    </html>
  );
}

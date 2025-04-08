import type { Metadata } from 'next';
import { Backdop } from '~/components/backdop/backdop';
import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header/header';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
import { Modal } from '~/components/modal/modal';
import type { Locale } from '~/i18n-config';
import { getUser } from '../auth/actions';
import { getDictionary } from './dictionaries';

import '~/styles/globals.css';

export const metadata: Metadata = {
  title: 'Restman',
  description: 'REST api testing tool',
  icons: {
    icon: '/logo.svg',
  },
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const user = await getUser();
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body className="body">
        <Backdop />
        <Header dict={dict.Header} locale={locale} user={user} />
        <main className="main">{children}</main>
        <Footer />
        <Loader />
        <Message />
        <Modal />
      </body>
    </html>
  );
}

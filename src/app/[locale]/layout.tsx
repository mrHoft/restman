import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Backdop } from '~/components/backdop/backdop';
import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header/header';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
import { Locale } from '~/i18n-config';
import { getUser } from '../auth/actions';
import { getDictionary } from './dictionaries';

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
      <body className={`body ${geistSans.variable} ${geistMono.variable}`}>
        <Backdop />
        <Header dict={dict.Header} user={user} />
        <main className="main">{children}</main>
        <Footer />
        <Loader />
        <Message />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { i18n } from '~/i18n-config';

import '~/styles/globals.css';

export const metadata: Metadata = {
  title: 'Restman',
  description: 'REST api testing tool',
  icons: {
    icon: '/logo.svg',
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const defaultLocale = cookieStore.get('locale')?.value ?? i18n.defaultLocale;

  return (
    <html lang={defaultLocale}>
      <body className="body">{children}</body>
    </html>
  );
}

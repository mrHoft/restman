import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}

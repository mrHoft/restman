import type { Metadata } from 'next';

import '~/styles/globals.css';

export const metadata: Metadata = {
  title: 'Restman',
  description: 'REST api testing tool',
  icons: {
    icon: '/logo.svg',
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body className="body">
        <main className="main">{children}</main>
      </body>
    </html>
  );
}

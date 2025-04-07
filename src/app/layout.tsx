import '~/styles/globals.css';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="body">
        <main className="main">{children}</main>
      </body>
    </html>
  );
}

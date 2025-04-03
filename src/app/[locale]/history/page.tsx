import History from '~/widgets/history/history';

export default async function PageHistory({ params }: { params: Promise<{ locale: string; slug?: string[] }> }) {
  const { locale } = await params;
  return <History locale={locale} />;
}

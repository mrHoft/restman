import History from '~/widgets/history/history';

export default async function HistoryPage({ params }: { params: Promise<{ locale: string; slug?: string[] }> }) {
  const { locale } = await params;
  return <History locale={locale} />;
}

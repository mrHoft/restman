import type { Locale } from '~/i18n-config';
import History from '~/widgets/history/history';
import { getDictionary } from '../dictionaries';

export default async function PageHistory({ params }: { params: Promise<{ locale: Locale; slug?: string[] }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <>
      <History dict={dict.History} locale={locale} />
    </>
  );
}

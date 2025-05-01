import { Suspense } from 'react';
import Loading from '~/components/loader/loading';
import type { Locale } from '~/i18n-config';
import History from '~/widgets/history/history';
import { getDictionary } from '../dictionaries';

export default async function PageHistory({ params }: { params: Promise<{ locale: Locale; slug?: string[] }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <History dict={dict.History} locale={locale} />
      </Suspense>
    </>
  );
}

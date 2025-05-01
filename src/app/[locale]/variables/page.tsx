import { Suspense } from 'react';
import Loading from '~/components/loader/loading';
import type { Locale } from '~/i18n-config';
import Variables from '~/widgets/variables/variables';
import { getDictionary } from '../dictionaries';

export default async function PageVariables({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Variables dict={dict.Variables} />
      </Suspense>
    </>
  );
}

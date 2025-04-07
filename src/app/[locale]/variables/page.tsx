import { lazy, Suspense } from 'react';
import Loading from '~/components/loader/loading';
import { getDictionary } from '../dictionaries';

const Variables = lazy(() => import('~/widgets/variables/variables'));

export default async function PageVariables({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
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

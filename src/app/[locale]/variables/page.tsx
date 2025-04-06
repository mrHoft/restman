import { lazy } from 'react';
import { getUser } from '~/app/auth/actions';
import { getDictionary } from '../dictionaries';

const Variables = lazy(() => import('~/widgets/variables/variables'));

export default async function VariablesPage({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const user = await getUser();
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <>{user && <Variables dict={dict.Variables} />}</>;
}

import dynamic from 'next/dynamic';
import { getUser } from '~/app/auth/actions';
import { Welcome } from '~/components/welcome/welcome';
import { getDictionary } from '../dictionaries';

const Variables = dynamic(() => import('~/widgets/variables/variables'));

export default async function VariablesPage({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const user = await getUser();
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return user ? <Variables dict={dict.Variables} /> : <Welcome dict={dict.MainPage} />;
}

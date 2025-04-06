import dynamic from 'next/dynamic';
import { getUser } from '~/app/auth/actions';
import { Welcome } from '~/components/welcome/welcome';
import type { Locale } from '~/i18n-config';
import { getDictionary } from '../dictionaries';

const History = dynamic(() => import('~/widgets/history/history'));

export default async function PageHistory({ params }: { params: Promise<{ locale: Locale; slug?: string[] }> }) {
  const { locale } = await params;
  const user = await getUser();
  const dict = await getDictionary(locale);
  return user ? <History locale={locale} /> : <Welcome dict={dict.MainPage} />;
}

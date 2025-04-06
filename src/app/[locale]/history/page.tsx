import { getUser } from '~/app/auth/actions';
import { Welcome } from '~/components/welcome/welcome';
import type { Locale } from '~/i18n-config';
import History from '~/widgets/history/history';
import { getDictionary } from '../dictionaries';

export default async function PageHistory({ params }: { params: Promise<{ locale: Locale; slug?: string[] }> }) {
  const { locale } = await params;
  const user = await getUser();
  const dict = await getDictionary(locale);
  return user ? <History locale={locale} /> : <Welcome dict={dict.MainPage} />;
}

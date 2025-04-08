import Login from '~/components/login/login';
import { Locale } from '~/i18n-config';
import { getDictionary } from '../dictionaries';

export default async function PageLogin({ params }: { params: Promise<{ locale: Locale; slug?: string[] }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <Login dict={dict.LoginPage} locale={locale} />;
}

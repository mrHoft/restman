import Register from '~/components/register/register';
import { Locale } from '~/i18n-config';
import { getDictionary } from '../dictionaries';

export default async function PageRegister({ params }: { params: Promise<{ locale: Locale; slug?: string[] }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <Register dict={dict.RegisterPage} />;
}

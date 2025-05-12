import type { Locale } from '~/i18n-config';
import Login from '~/widgets/login/login';
import { getDictionary } from '../dictionaries';

export default async function PageLogin({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale; slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const { error } = await searchParams;

  return <Login dict={dict.LoginPage} locale={locale} error={error} />;
}

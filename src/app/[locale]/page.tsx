import { Welcome } from '~/components/welcome/welcome';
import { getDictionary } from './dictionaries';

export default async function Home({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <Welcome dict={dict.MainPage} />;
}

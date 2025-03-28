import { Example } from '~/components/example/example';
import { getDictionary } from './dictionaries';

export default async function Home({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <Example dict={dict.MainPage} />
    </>
  );
}

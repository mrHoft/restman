import type { Locale } from '~/i18n-config';
import Variables from '~/widgets/variables/variables';
import { getDictionary } from '../dictionaries';

export default async function PageVariables({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <>
      <Variables dict={dict.Variables} />
    </>
  );
}

import { lazy } from 'react';
import { getUser } from '~/app/auth/actions';
import type { Locale } from '~/i18n-config';

const History = lazy(() => import('~/widgets/history/history'));

export default async function PageHistory({ params }: { params: Promise<{ locale: Locale; slug?: string[] }> }) {
  const { locale } = await params;
  const user = await getUser();
  return <>{user && <History locale={locale} />}</>;
}

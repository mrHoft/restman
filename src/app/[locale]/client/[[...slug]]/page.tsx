import { RestClient } from '~/widgets/restClient/client';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale, slug } = await params;
  const [method, url, body] = slug || [];

  const search = await searchParams;

  return <RestClient locale={locale} method={method} initUrl={url} initBody={body} initQuery={search} />;
}

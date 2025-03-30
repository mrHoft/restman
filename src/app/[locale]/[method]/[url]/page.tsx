export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; method: string; url: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale, method, url } = await params;
  const search = await searchParams;

  return (
    <div>
      <div>Locale: {locale}</div>
      <div>Method: {method}</div>
      <div>Url: {url}</div> <div>Search: {JSON.stringify(search)}</div>
      {/* <Client locale={locale} method={method} url={url}  searchParams={search}/> */}
    </div>
  );
}

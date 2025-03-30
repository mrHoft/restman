export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ method: string; url: string; body: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { method, url, body } = await params;
  const search = await searchParams;

  return (
    <div>
      <div>Method: {method}</div>
      <div>Url: {url}</div>
      <div>Body: {body}</div> <div>Search: {JSON.stringify(search)}</div>
      {/* <Client method={method} url={url} body={body} searchParams={search}/> */}
    </div>
  );
}

import { executeRestRequest } from '~/app/rest/actions';
import { base64Decode } from '~/utils/base64';
import { isMethod } from '~/utils/rest';
import { RestClient } from '~/widgets/restClient/client';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale, slug } = await params;
  const [method = 'GET', encodedUrl = '', encodedBody = ''] = slug || [];
  const url = encodedUrl ? base64Decode(encodedUrl) : '';
  const body = encodedBody ? base64Decode(encodedBody) : '';
  const reqMethod = isMethod(method) ? method : 'GET';
  const search = await searchParams;
  const response = url
    ? await executeRestRequest({
        method,
        url,
        headers: Object.fromEntries(Object.entries(search).map(([k, v]) => [k, v?.toString() ?? ''])),
        body,
      })
    : { data: '', status: null };

  return (
    <RestClient
      locale={locale}
      method={reqMethod}
      initUrl={url}
      initBody={body}
      initQuery={search}
      response={response}
    />
  );
}

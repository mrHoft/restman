import dynamic from 'next/dynamic';
import { getUser } from '~/app/auth/actions';
import { executeRestRequest } from '~/app/rest/actions';
import { Welcome } from '~/components/welcome/welcome';
import type { Locale } from '~/i18n-config';
import { base64Decode } from '~/utils/base64';
import { isMethod } from '~/utils/rest';
import { getDictionary } from '../../dictionaries';

const RestClient = dynamic(() => import('~/widgets/restClient/client').then(mod => mod.RestClient));

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale; slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale, slug } = await params;
  const user = await getUser();
  const dict = await getDictionary(locale);
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

  return user ? (
    <RestClient
      locale={locale}
      method={reqMethod}
      initUrl={url}
      initBody={body}
      initQuery={search}
      response={response}
    />
  ) : (
    <Welcome dict={dict.MainPage} />
  );
}

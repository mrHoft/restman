'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader } from '~/components/loader/loader';
import { Select } from '~/components/select/select';
import useHistory from '~/entities/useHistory';
import useVariables from '~/entities/useVariables';
import type { Locale } from '~/i18n-config';
import { getRequestUrlString, methods, type TMethod } from '~/utils/rest';
import { CodeGenerator } from '~/widgets/codeGenerator/generator';
import HeadersEditor, { HeadersItem } from '~/widgets/headersEditor/editor';
import RequestBodyEditor from '~/widgets/requestBodyEditor/editor';
import { ResponseViewer } from '~/widgets/response/response';

import styles from './client.module.css';

interface RestClientProps {
  locale: Locale;
  method: TMethod;
  initUrl: string;
  initBody: string;
  initQuery: { [key: string]: string | string[] | undefined };
  response: { data: string; status: number | null };
}

export default function RestClient({ locale, initUrl, initBody, initQuery, method, response }: RestClientProps) {
  const { pushHistory } = useHistory();
  const router = useRouter();
  const [url, setUrl] = useState(initUrl || '');
  const [headers, setHeaders] = useState<HeadersItem[]>(
    initQuery
      ? Object.entries(initQuery).map(([key, value]) => ({ key, value: value?.toString() ?? '', enabled: true }))
      : []
  );
  const [body, setBody] = useState(initBody);
  const { getVariables } = useVariables();

  const handleMethodChange = (newMethod: string) => {
    const requestUrl = getRequestUrlString({
      locale,
      method: newMethod,
    });
    router.push(requestUrl);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Loader.show();
    const variables = getVariables() ?? {};
    const replaceVariables = (value: string) => {
      return value.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
        return variables[variable] ?? match;
      });
    };
    const activeHeaders = headers
      .filter(h => h.enabled && h.key && h.value)
      .map(({ key, value }) => ({ key, value: replaceVariables(value) }));
    const requestUrl = getRequestUrlString({
      locale,
      method,
      url: replaceVariables(url),
      body: replaceVariables(body),
      headers: activeHeaders,
    });

    pushHistory({ method, url: requestUrl, date: Date.now() });
    router.push(requestUrl);
  };

  useEffect(() => {
    Loader.hide();
  }, [response]);

  return (
    <div className={styles.client}>
      <h1 className={styles.client__title}>REST Client</h1>
      <form onSubmit={handleSubmit} className={styles.client__form}>
        <div>
          <Select
            options={[...methods]}
            name="method"
            value={method}
            onChange={value => handleMethodChange(value)}
            required={true}
            placeholder="Method"
          />
        </div>
        <input
          type="text"
          name="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter URL"
          className={styles.client__url}
        />
        <button type="submit" className="button">
          Send
        </button>
      </form>
      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      <RequestBodyEditor value={body} onChange={setBody} />
      <CodeGenerator method={method} url={url} body={body} headers={headers} />
      <ResponseViewer data={response.data} status={response.status} />
    </div>
  );
}

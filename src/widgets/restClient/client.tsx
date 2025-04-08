'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { RestResponse } from '~/app/rest/actions';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
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
  dict: Record<string, string>;
  locale: Locale;
  method: TMethod;
  initUrl: string;
  initBody: string;
  initQuery: { [key: string]: string | string[] | undefined };
  response: RestResponse;
}

export default function RestClient({ dict, locale, initUrl, initBody, initQuery, method, response }: RestClientProps) {
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
    if (response.error) {
      Message.show(response.error, 'error');
    }
  }, [response]);

  return (
    <div className={styles.client}>
      <h1 className={styles.client__title}>{dict.title}</h1>
      <form onSubmit={handleSubmit} className={styles.client__form}>
        <div>
          <Select
            options={[...methods]}
            name="method"
            value={method}
            onChange={value => handleMethodChange(value)}
            required={true}
            placeholder={dict.methodPlaceholder}
          />
        </div>
        <input
          type="text"
          name="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder={dict.urlPlaceholder}
          className={styles.client__url}
        />
        <button type="submit" className="button">
          {dict.send}
        </button>
      </form>
      <HeadersEditor dict={dict} headers={headers} setHeaders={setHeaders} />
      <RequestBodyEditor dict={dict} value={body} onChange={setBody} />
      <CodeGenerator dict={dict} method={method} url={url} body={body} headers={headers} />
      {response.data && (
        <ResponseViewer
          dict={dict}
          data={response.data ?? response.message ?? ''}
          status={response.status}
          message={response.message}
          lapse={response.lapse}
        />
      )}
    </div>
  );
}

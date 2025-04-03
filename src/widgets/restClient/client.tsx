'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Message } from '~/components/message/message';
import { Select } from '~/components/select/select';
import { base64Decode, base64Encode } from '~/utils/base64';
import { prettify } from '~/utils/pretty';
import { CodeGenerator } from '~/widgets/codeGenerator/generator';
import HeadersEditor, { HeadersItem } from '~/widgets/headersEditor/editor';
import RequestBodyEditor from '~/widgets/requestBodyEditor/editor';

import styles from './client.module.css';

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

interface RestClientProps {
  locale: string;
  method: (typeof methods)[number];
  initUrl: string;
  initBody: string;
  initQuery: { [key: string]: string | string[] | undefined };
}

export function RestClient({ locale, initUrl, initBody, initQuery, method = 'GET' }: Partial<RestClientProps>) {
  const decodedUrl = useMemo(() => (initUrl ? base64Decode(initUrl) : ' '), [initUrl]);
  const decodedBody = useMemo(() => (initBody ? base64Decode(initBody) : ''), [initBody]);
  const router = useRouter();
  const [url, setUrl] = useState(decodedUrl || '');
  const [headers, setHeaders] = useState<HeadersItem[]>(
    initQuery ? Object.entries(initQuery).map(([key, value]) => ({ key, value: value?.toString() ?? '' })) : []
  );
  const [response, setResponse] = useState<{ data: string; status: number | null }>({ data: '', status: null });
  const [body, setBody] = useState(decodedBody);

  const queryString = useMemo(() => headers.map(({ key, value }) => `${key}=${value}`).join('&'), [headers]);

  const handleMethod = (method: string) => {
    router.push(`/${locale}/client/${method}/${base64Encode(url) || ' '}/${base64Encode(body) || ''}?${queryString}`);
  };

  const handleSendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const reqBody = body ? JSON.stringify(JSON.parse(body)) : '';

      const res = await fetch(url, {
        method,
        headers: new Headers(Object.fromEntries(headers.map(({ key, value }) => [key, value]))),
        body: method !== 'GET' && method !== 'DELETE' ? reqBody : undefined,
      });

      const data = await res.json();
      setResponse({ data: JSON.stringify(data, null, 2), status: res.status });

      router.push(
        `/${locale}/client/${method}/${base64Encode(url) || ' '}/${base64Encode(reqBody) || ''}?${queryString}`
      );
    } catch (error) {
      Message.show('Request failed', 'error');
      console.error(error);
    }
  };

  return (
    <div className={styles.client}>
      <h1 className={styles.client__title}>REST Client</h1>
      <form onSubmit={handleSendRequest} className={styles.client__form}>
        <div>
          <Select
            options={methods}
            name="method"
            value={method}
            onChange={value => handleMethod(value)}
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
      <div className="horizontal_line" />
      <section className={styles.client__response}>
        <div className={styles.client__response_header}>
          <h3>Response</h3>
          {response.status && <span className={styles.client__response_status}>Status: {response.status}</span>}
        </div>
        <div className={styles.client__response_body}>{prettify(response.data).result}</div>
      </section>
    </div>
  );
}

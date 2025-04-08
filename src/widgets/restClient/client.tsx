'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ButtonSquare } from '~/components/button/square';
import { Loader } from '~/components/loader/loader';
import { Modal } from '~/components/modal/modal';
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

  const handleNavigate = (url: string) => () => {
    Loader.show();
    router.push(url);
  };

  const handleCodeGenerator = () => {
    Modal.show(<CodeGenerator method={method} url={url} body={body} headers={headers} />);
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
      <div className={styles.client__btns}>
        <ButtonSquare icon="code" title="Generate code" onClick={handleCodeGenerator} />
        <ButtonSquare icon="list" title="History" onClick={handleNavigate('/history')} />
        <ButtonSquare icon="hash" title="Variables" onClick={handleNavigate('/variables')} />
      </div>
      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      <RequestBodyEditor value={body} onChange={setBody} />
      <ResponseViewer data={response.data} status={response.status} />
    </div>
  );
}

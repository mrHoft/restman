'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { RestResponse } from '~/app/rest/actions';
import { ButtonSquare } from '~/components/button/square';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
import { Modal } from '~/components/modal/modal';
import { useDebounce } from '~/entities/useDebounce';
import useHistory from '~/entities/useHistory';
import useVariables from '~/entities/useVariables';
import type { Locale } from '~/i18n-config';
import { getRequestUrlString, methods, type TMethod } from '~/utils/rest';
import { CodeEditor } from '~/widgets/codeEditor/editor';
import { CodeGenerator } from '~/widgets/codeGenerator/generator';
import HeadersEditor, { HeadersItem } from '~/widgets/headersEditor/editor';
import { ResponseViewer } from '~/widgets/response/response';

import styles from './client.module.css';

type TQuery = { [key: string]: string | string[] | undefined };
interface RestClientProps {
  dict: Record<string, string>;
  locale: Locale;
  initMethod: TMethod;
  initUrl: string;
  initBody: string;
  initQuery: TQuery;
  response: RestResponse;
}

const getInitialHeaders = (query: TQuery) => {
  const defaultHeader = { key: '', value: '', enabled: true };

  return query
    ? [
        ...Object.entries(query).map(([key, value]) => ({ key, value: value?.toString() ?? '', enabled: true })),
        defaultHeader,
      ]
    : [defaultHeader];
};

export default function RestClient({
  dict,
  locale,
  initUrl,
  initBody,
  initQuery,
  initMethod,
  response,
}: RestClientProps) {
  const { pushHistory } = useHistory();
  const router = useRouter();
  const [method, setMethod] = useState(initMethod);
  const [url, setUrl] = useState(initUrl || '');
  const [headers, setHeaders] = useState<HeadersItem[]>(getInitialHeaders(initQuery));
  const [body, setBody] = useState(initBody);
  const { getVariables } = useVariables();
  const variables = useMemo(() => getVariables() ?? {}, [getVariables]);
  const replaceVariables = useCallback(
    (value: string): string => {
      return value.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
        return variables[variable] ?? match;
      });
    },
    [variables]
  );
  const activeHeaders = useMemo(
    () =>
      headers
        .filter(h => h.enabled && h.key && h.value)
        .map(({ key, value, enabled }) => ({ key, value: replaceVariables(value), enabled })),
    [headers, replaceVariables]
  );
  const debouncedUrl = useDebounce(url);
  const debouncedHeaders = useDebounce(activeHeaders);
  const requestPath = useMemo(() => {
    return getRequestUrlString({
      locale,
      method,
      url: replaceVariables(debouncedUrl),
      body: replaceVariables(body),
      headers: debouncedHeaders,
    });
  }, [locale, method, debouncedUrl, body, debouncedHeaders, replaceVariables]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Loader.show();
    pushHistory({ method, url: requestPath, date: Date.now() });
    router.push(requestPath);
  };

  const handleNavigate = (url: string) => () => {
    Loader.show();
    router.push(url);
  };

  const handleCodeGenerator = () => {
    Modal.show(<CodeGenerator dict={dict} method={method} url={url} body={body} headers={activeHeaders} />);
  };

  useEffect(() => {
    history.replaceState(null, '', requestPath);
  }, [requestPath]);

  useEffect(() => {
    if (response.error) {
      Message.show(response.error, 'error');
    }
  }, [response]);

  useEffect(() => {
    Loader.hide();
  });

  return (
    <div className={styles.client}>
      <h1 className={styles.client__title}>{dict.title}</h1>
      <form onSubmit={handleSubmit} className={styles.client__form}>
        <div className={styles.client__req}>
          <select
            name="method"
            value={method}
            onChange={e => setMethod(e.target.value as TMethod)}
            className={styles.client__method}
          >
            {methods.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder={dict.urlPlaceholder}
            className={styles.client__url}
          />
        </div>
        <button type="submit" className="button">
          {dict.send}
        </button>
      </form>
      <div className={styles.client__btns}>
        <ButtonSquare icon="code" title="Generate code" onClick={handleCodeGenerator} />
        <ButtonSquare icon="list" title="History" onClick={handleNavigate('/history')} />
        <ButtonSquare icon="hash" title="Variables" onClick={handleNavigate('/variables')} />
      </div>
      <HeadersEditor dict={dict} headers={headers} setHeaders={setHeaders} />
      <section aria-label="body">
        <h3 className={styles.client__section_title}>{dict.body}</h3>
        <CodeEditor name="body" data={body} onBlur={setBody} />
      </section>
      {response.data && <ResponseViewer dict={dict} response={response} />}
      <CodeGenerator dict={dict} method={method} url={url} body={body} headers={activeHeaders} />
    </div>
  );
}

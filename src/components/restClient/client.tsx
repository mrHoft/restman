'use client';

import { useState } from 'react';
import RequestBodyEditor from '~/components/requestBodyEditor/editor';
import { Select } from '~/components/select/select';
import { prettify, tryParseJson } from '~/utils/pretty';

import styles from './client.module.css';

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export function RestClient() {
  const [response, setResponse] = useState<{ data: string; status: number | null }>({ data: '', status: null });
  const [body, setBody] = useState('');

  const handleSendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const method = formData.get('method') as string;
    const url = formData.get('url') as string;
    const reqBody = tryParseJson(body);

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method !== 'GET' ? reqBody : undefined,
      });

      const data = await res.json();
      setResponse({ data: JSON.stringify(data, null, 2), status: res.status });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.client__container}>
      <h1 className={styles.client__title}>REST Client</h1>
      <form onSubmit={handleSendRequest} className={styles.client__form}>
        <div className={styles.client__method}>
          <Select options={methods} name="method" defaultValue="GET" placeholder="Method" />
        </div>
        <input type="text" name="url" placeholder="Enter URL" className={styles.client__url} />
        <button type="submit" className="button">
          Send
        </button>
      </form>
      <div>Headers</div>
      <RequestBodyEditor value={body} onChange={setBody} />
      <section>
        <h3>Generated Code</h3>
      </section>
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

'use client';

import { useMemo, useState } from 'react';

import styles from './headersEditor.module.css';

export interface HeadersItem {
  key: string;
  value: string;
}

export default function HeadersEditor({ defauldHeaders }: { defauldHeaders: Record<string, string>[] }) {
  const defaultHeadersState = useMemo(() => {
    if (!defauldHeaders) return [{ key: '', value: '' }];
    const newheaders = defauldHeaders.map(header => ({
      key: Object.keys(header)[0],
      value: Object.values(header)[0],
    }));
    newheaders.push({ key: '', value: '' });
    return newheaders;
  }, [defauldHeaders]);

  const [headers, setHeaders] = useState<HeadersItem[]>(defaultHeadersState);

  const handleInputChange = (id: number, input: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[id][input] = value;
    setHeaders(newHeaders);
  };

  const result = useMemo(
    () =>
      headers.reduce<Record<string, string>>((acc, header) => {
        if (header.key === '' && header.value === '') return acc;
        acc[header.key] = header.value;
        return acc;
      }, {}),
    [headers]
  );

  return (
    <div>
      <div className={styles.header_editor__title}>Headers:</div>
      <div className={styles.header_editor__row}>
        <div className={styles.header_editor__item}></div>
        <div className={styles.header_editor__button} onClick={() => setHeaders([...headers, { key: '', value: '' }])}>
          Add
        </div>
      </div>
      {headers.map((header, index) => (
        <div key={index} className={styles.header_editor__row}>
          <input type="text" value={header.key} onChange={e => handleInputChange(index, 'key', e.target.value)} />
          <input type="text" value={header.value} onChange={e => handleInputChange(index, 'value', e.target.value)} />
        </div>
      ))}
      <input
        type="text"
        readOnly
        name="headers"
        className={styles.header_editor__result}
        value={JSON.stringify(result)}
      />
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';

import styles from './editor.module.css';
import HeadersTable from './headersTable';

export interface HeadersItem {
  key: string;
  value: string;
}

export default function HeadersEditor({ defauldHeaders }: { defauldHeaders: HeadersItem[] }) {
  const [headers, setHeaders] = useState<HeadersItem[]>([...defauldHeaders, { key: '', value: '' }]);

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
      <HeadersTable headers={headers} onChange={handleInputChange} />
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

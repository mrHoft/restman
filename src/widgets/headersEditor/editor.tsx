'use client';

import { useMemo, useState } from 'react';

import styles from './editor.module.css';

export interface HeadersItem {
  key: string;
  value: string;
}

export default function HeadersEditor({ defauldHeaders }: { defauldHeaders: HeadersItem[] }) {
  const [headers, setHeaders] = useState<HeadersItem[]>([...defauldHeaders, { key: '', value: '' }]);

  const handleAdd = () => setHeaders(prev => [...prev, { key: '', value: '' }]);

  const handleInputChange = (id: number, field: 'key' | 'value', value: string) => {
    setHeaders(prev => {
      const headers = [...prev];
      headers[id][field] = value;
      return headers;
    });
  };

  const headersTable = useMemo(() => {
    return (
      <>
        {headers.map((header, index) => (
          <div key={index} className={styles.header_editor__row}>
            <input type="text" value={header.key} onChange={e => handleInputChange(index, 'key', e.target.value)} />
            <input type="text" value={header.value} onChange={e => handleInputChange(index, 'value', e.target.value)} />
          </div>
        ))}
      </>
    );
  }, [headers]);

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
      {headersTable}
      <div className={styles.header_editor__row}>
        <div className={styles.header_editor__item}></div>
        <div className={styles.header_editor__button} onClick={handleAdd}>
          Add
        </div>
      </div>
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

'use client';

import { useMemo } from 'react';

import styles from './editor.module.css';

export interface HeadersItem {
  key: string;
  value: string;
}

interface HeadersEditorProps {
  headers: HeadersItem[];
  setHeaders: React.Dispatch<React.SetStateAction<HeadersItem[]>>;
}

export default function HeadersEditor({ headers, setHeaders }: HeadersEditorProps) {
  const handleAdd = () => setHeaders(prev => [...prev, { key: '', value: '' }]);

  const headersTable = useMemo(() => {
    const handleInputChange = (id: number, field: 'key' | 'value', value: string) => {
      setHeaders(prev => {
        const headers = [...prev];
        headers[id][field] = value;
        return headers;
      });
    };

    return (
      <>
        {headers.map((header, index) => (
          <div key={index} className={styles.header_editor__row}>
            <input type="text" value={header.key} onChange={e => handleInputChange(index, 'key', e.target.value)} />
            <input type="text" value={header.value} onChange={e => handleInputChange(index, 'value', e.target.value)} />
            <button onClick={() => setHeaders(prev => prev.filter((_, i) => i !== index))}>
              <img src="/icons/cross.svg" alt="delete" />
            </button>
          </div>
        ))}
      </>
    );
  }, [headers, setHeaders]);

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
      <h3 className={styles.header_editor__title}>Headers</h3>
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

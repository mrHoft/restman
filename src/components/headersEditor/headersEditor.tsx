'use client';

import { useEffect, useState } from 'react';

import styles from './headersEditor.module.css';

export interface HeadersItem {
  id: number;
  headerKey: string;
  headerValue: string;
}

export default function HeadersEditor() {
  const [headers, setHeaders] = useState<HeadersItem[]>([{ id: Date.now(), headerKey: '', headerValue: '' }]);

  const [hiddenValue, setHiddenValue] = useState({});

  const transformHeaders = () => {
    return headers.reduce(
      (acc, header) => {
        if (header.headerKey === '' && header.headerValue === '') return acc;
        acc[header.headerKey] = header.headerValue;
        return acc;
      },
      {} as Record<string, string>
    );
  };

  useEffect(() => {
    setHiddenValue(transformHeaders());
  }, [headers]);

  const handleInputChange = (id: number, input: 'headerKey' | 'headerValue', value: string) => {
    const newHeaders = headers.map(header => {
      if (header.id === id) {
        return { ...header, [input]: value };
      }
      return header;
    });

    const lastHeadersRow = newHeaders[newHeaders.length - 1];

    if (lastHeadersRow.headerKey !== '' || lastHeadersRow.headerValue !== '') {
      newHeaders.push({ id: Date.now(), headerKey: '', headerValue: '' });
    }

    setHeaders(newHeaders);
  };

  const handleEmptyRow = () => {
    const newHeaders = headers
      .filter((header, index) => {
        if (index === headers.length - 1) return true;
        return header.headerKey !== '' || header.headerValue !== '';
      })
      .map(header => {
        return { id: header.id, headerKey: header.headerKey.trim(), headerValue: header.headerValue.trim() };
      });

    setHeaders(newHeaders);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editor__row}>
        <div className={styles.editor__key}>Header Key</div>
        <div className={styles.editor__value}>Header Value</div>
      </div>
      {headers.map(header => (
        <div key={header.id} className={styles.editor__row}>
          <input
            type="text"
            value={header.headerKey}
            onChange={e => handleInputChange(header.id, 'headerKey', e.target.value)}
            onBlur={handleEmptyRow}
            className={styles.editor__key}
          />
          <input
            type="text"
            placeholder="Add"
            value={header.headerValue}
            onChange={e => handleInputChange(header.id, 'headerValue', e.target.value)}
            onBlur={handleEmptyRow}
            className={styles.editor__value}
          />
        </div>
      ))}
      <input
        type="text"
        readOnly
        name="headers"
        className={styles.headers__hidden}
        value={JSON.stringify(hiddenValue)}
      />
    </div>
  );
}

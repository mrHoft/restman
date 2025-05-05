'use client';

import styles from './headers.module.css';

interface HeadersViewerProps {
  dict: Record<string, string>;
  headers: Record<string, string>;
}

export function HeadersViewer({ dict, headers }: HeadersViewerProps) {
  if (!headers || Object.keys(headers).length === 0) return null;

  return (
    <section className={styles.response} aria-label="headers">
      <div className={styles.response__controls}>
        <h3>{dict.headers}</h3>
      </div>
      <div className={styles.response__body}>
        {Object.entries(headers).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong>{' '}
            {typeof value === 'string'
              ? value?.toString().replace(/\\/g, '')
              : JSON.stringify(value, null, 2).replace(/\\/g, '')}
          </div>
        ))}
      </div>
    </section>
  );
}

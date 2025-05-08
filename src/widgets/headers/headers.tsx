'use client';

import styles from './headers.module.css';

interface HeadersViewerProps {
  dict: Record<string, string>;
  headers: Record<string, string>;
}

export function HeadersViewer({ dict, headers }: HeadersViewerProps) {
  return (
    <div className={styles.headers} aria-label="headers">
      <div className={styles.headers__controls}>
        <h3>{dict.headers}</h3>
      </div>
      <div className={styles.headers__body} contentEditable={false}>
        {Object.entries(headers).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong>{' '}
            {typeof value === 'string'
              ? value?.replaceAll('\\', '')
              : JSON.stringify(value, null, 2).replaceAll('\\', '')}
          </div>
        ))}
      </div>
    </div>
  );
}

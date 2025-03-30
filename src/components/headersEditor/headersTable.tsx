import React from 'react';
import { HeadersItem } from './headersEditor';

import styles from './headersEditor.module.css';

interface HeadersTableProps {
  headers: HeadersItem[];
  onChange: (id: number, input: 'key' | 'value', value: string) => void;
}

function HeadersTable({ headers, onChange }: HeadersTableProps) {
  return (
    <>
      {headers.map((header, index) => (
        <div key={index} className={styles.header_editor__row}>
          <input type="text" value={header.key} onChange={e => onChange(index, 'key', e.target.value)} />
          <input type="text" value={header.value} onChange={e => onChange(index, 'value', e.target.value)} />
        </div>
      ))}
    </>
  );
}

export default React.memo(HeadersTable);

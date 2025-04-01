'use client';

import React from 'react';
import { Select } from '~/components/select/select';
import { generateCode, type TRuntime } from '~/utils/generator';
import type { HeadersItem } from '~/widgets/headersEditor/editor';

const options: TRuntime[] = ['curl', 'fetch', 'xhr', 'node', 'go', 'python', 'java', 'csharp'];

interface GeneratorProps {
  method: string;
  url: string;
  body: string;
  headers: HeadersItem[];
}

export function CodeGenerator({ method, url, body, headers }: GeneratorProps) {
  const [runtime, setRuntime] = React.useState<TRuntime>('curl');

  const handleChange = (value: string) => {
    setRuntime(value as TRuntime);
  };

  return (
    <details>
      <summary style={{ cursor: 'pointer' }}>Generate code</summary>
      <div style={{ width: '12rem' }}>
        <Select options={options} name="select" placeholder="runtime" defaultValue={runtime} onChange={handleChange} />
      </div>
      <pre>
        <code style={{ whiteSpace: 'pre-wrap' }}>{generateCode(runtime, method, url, body, headers)}</code>
      </pre>
    </details>
  );
}

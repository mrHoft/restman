import { CodeEditor } from '../codeEditor/editor';

import styles from './response.module.css';

interface ResponseViewerProps {
  dict: Record<string, string>;
  data: string;
  status: number;
  message: string;
  lapse: number;
}

export function ResponseViewer({ dict, data, status, message, lapse }: ResponseViewerProps) {
  return (
    <section className={styles.response} aria-label="response">
      <div className={styles.response__controls}>
        <h3>{dict.response}</h3>
        {status && (
          <div className={styles.response__status}>
            <span>{status}</span>
            <span style={{ color: status === 200 ? 'green' : 'unset' }}>{message}</span>
            <span style={{ color: lapse < 2500 ? 'green' : 'red' }}>{`${lapse}ms`}</span>
          </div>
        )}
      </div>
      <CodeEditor name="response" value={data} readonly prettify />
    </section>
  );
}

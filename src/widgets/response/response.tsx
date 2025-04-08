import { prettify } from '~/utils/pretty';

import styles from './response.module.css';

interface ResponseViewerProps {
  dict: Record<string, string>;
  data: string;
  status: number | null;
}

export function ResponseViewer({ dict, data, status }: ResponseViewerProps) {
  return (
    <section className={styles.response}>
      <div className={styles.response__header}>
        <h3>{dict.response}</h3>
        {status && (
          <span className={styles.response__status}>
            {dict.status}: {status}
          </span>
        )}
      </div>
      <div className={styles.response__body}>{prettify(data).result}</div>
    </section>
  );
}

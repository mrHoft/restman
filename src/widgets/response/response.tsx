import { prettify } from '~/utils/pretty';

import styles from './response.module.css';

interface ResponseViewerProps {
  data: string;
  status: number | null;
}

export function ResponseViewer({ data, status }: ResponseViewerProps) {
  return (
    <section className={styles.response}>
      <div className={styles.response__header}>
        <h3>Response</h3>
        {status && <span className={styles.response__status}>Status: {status}</span>}
      </div>
      <div className={styles.response__body}>{prettify(data).result}</div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import useHistory, { type HistoryRecord } from '~/entities/useHistory';

import styles from './history.module.css';

export default function History({ locale }: { locale: string }) {
  const { getHistory } = useHistory();

  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const storedHistory = getHistory();
    if (storedHistory) {
      const sortedHistory = storedHistory && storedHistory.sort((a, b) => b.date - a.date);
      setHistory(() => [...sortedHistory]);
    }
  }, []);

  return (
    <div className={styles.history}>
      <h2 className={styles.history__title}>History Requests</h2>

      {history.length > 0 ? (
        history.map((item, index) => (
          <div key={index} className={styles.history__item}>
            <div>{item.method}</div>
            <Link className={styles.history__url} href={`${item.url}`}>
              {item.url}
            </Link>
          </div>
        ))
      ) : (
        <div className={styles.history__empty}>
          History is empty. It&apos;s time to{' '}
          <Link
            className={styles.history__client_link}
            href={{
              pathname: `/${locale}/client`,
            }}
          >
            make your first request!
          </Link>
        </div>
      )}
    </div>
  );
}

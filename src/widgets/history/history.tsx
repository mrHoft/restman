'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Pagination from '~/components/pagination/pagination';
import useHistory, { type HistoryRecord } from '~/entities/useHistory';

import styles from './history.module.css';

export const ItemsForPage = 10;

export default function History({ locale }: { locale: string }) {
  const { getHistory } = useHistory();
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentHistory = useMemo(
    () => history.slice((currentPage - 1) * ItemsForPage, currentPage * ItemsForPage),
    [history, currentPage]
  );

  useEffect(() => {
    const storedHistory = getHistory();
    if (storedHistory) {
      setHistory(storedHistory.sort((a, b) => b.date - a.date));
    }
  }, [getHistory]);

  const switchPage = (page: number) => {
    router.push(`${pathname}?page=${page + 1}`);
  };

  return (
    <div className={styles.history}>
      <h2 className={styles.history__title}>History Requests</h2>

      {currentHistory.length > 0 ? (
        <>
          {currentHistory.map((item, index) => (
            <div key={index} className={styles.history__item}>
              <div>{item.method}</div>
              <Link className={styles.history__url} href={`${item.url}`}>
                {item.url}
              </Link>
            </div>
          ))}
          <div>
            <Pagination
              page={currentPage - 1}
              pageSize={ItemsForPage}
              total={history.length}
              onChange={page => switchPage(page)}
            />
          </div>
        </>
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

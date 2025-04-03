'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import useHistory, { type HistoryRecord } from '~/entities/useHistory';

import styles from './history.module.css';

export const ItemsForPage = 10;

export default function History({ locale }: { locale: string }) {
  const { getHistory } = useHistory();
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPage = Math.ceil(history.length / ItemsForPage);
  const currentPage = Number(searchParams.get('page')) || 1;
  const lastItemIndex = useMemo(() => currentPage * ItemsForPage, [currentPage]);
  const firstItemIndex = useMemo(() => lastItemIndex - ItemsForPage, [lastItemIndex]);
  const currentHistory = useMemo(() => history.slice(firstItemIndex, lastItemIndex), [history, currentPage]);

  useEffect(() => {
    const storedHistory = getHistory();
    if (storedHistory) {
      const newHistory = storedHistory.sort((a, b) => b.date - a.date);
      setHistory(newHistory);
    }
  }, [getHistory]);

  const Pagination = useMemo(() => {
    const handlePrev = () => {
      router.push(`${pathname}?page=${currentPage - 1}`);
    };
    const handleNext = () => {
      router.push(`${pathname}?page=${currentPage + 1}`);
    };
    return (
      <div className={styles.history__pagination}>
        <button
          disabled={currentPage === 1}
          className={`${styles.history__page} ${styles.prev} `}
          onClick={handlePrev}
        ></button>
        <span>
          {currentPage} / {lastPage}
        </span>
        <button
          disabled={currentPage === lastPage}
          className={`${styles.history__page} ${styles.next}`}
          onClick={handleNext}
        ></button>
      </div>
    );
  }, [currentPage, history, pathname, router]);

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
          {Pagination}
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

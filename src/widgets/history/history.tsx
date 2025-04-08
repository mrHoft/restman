'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Loader } from '~/components/loader/loader';
import Pagination from '~/components/pagination/pagination';
import useHistory, { type HistoryRecord } from '~/entities/useHistory';

import styles from './history.module.css';

export const ItemsForPage = 10;

export default function History({ dict, locale }: { dict: Record<string, string>; locale: string }) {
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
    Loader.hide();
    const storedHistory = getHistory();
    if (storedHistory) {
      setHistory(storedHistory.sort((a, b) => b.date - a.date));
    }
  }, [getHistory]);

  const setPage = (page: number) => {
    router.push(`${pathname}?page=${page + 1}`);
  };

  return (
    <div className={styles.history}>
      <h2 className={styles.history__title}>{dict.title}</h2>

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
            <Pagination page={currentPage - 1} pageSize={ItemsForPage} total={history.length} onChange={setPage} />
          </div>
        </>
      ) : (
        <div className={styles.history__empty}>
          {dict.empty}{' '}
          <Link
            className={styles.history__client_link}
            href={{
              pathname: `/${locale}/client/GET`,
            }}
          >
            {dict.linkToClient}
          </Link>
        </div>
      )}
    </div>
  );
}

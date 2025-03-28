'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Message } from '~/components/message/message';
import { Modal } from '~/components/modal/modal';
import { Loader } from '../loader/loader';
import Pagination from '../pagination/pagination';
import { Select } from '../select/select';

import styles from './example.module.css';

export function Example() {
  const [page, setPage] = React.useState(0);
  const t = useTranslations('MainPage');

  const handleShowLoader = () => {
    Loader.show();
    setTimeout(() => {
      Loader.hide();
    }, 2000);
  };

  return (
    <div className={styles.example}>
      <h3>{t('title')}</h3>
      <div className={styles.example__btns}>
        <button className="button" onClick={handleShowLoader}>
          {t('buttonForLoader')}
        </button>
        <button className="button" onClick={() => Modal.show(<h3>Modal example</h3>)}>
          {t('buttonForModal')}
        </button>
        <button className="button" onClick={() => Message.show('Example message', 'regular')}>
          {t('buttonForMessage')}
        </button>
        <Select
          options={[t('option1'), t('option2'), t('option3')]}
          name="select"
          placeholder={t('selectorPlaceholder')}
          defaultValue={t('option1')}
          onChange={value => console.log(value)}
        />
        <Pagination page={page} total={100} pageSize={10} onChange={setPage} />
      </div>
    </div>
  );
}

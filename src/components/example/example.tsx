'use client';

import React from 'react';
import { Message } from '~/components/message/message';
import { Modal } from '~/components/modal/modal';
import { Loader } from '../loader/loader';
import Pagination from '../pagination/pagination';
import { Select } from '../select/select';

import styles from './example.module.css';

export function Example({ dict }: { dict: Record<string, string> }) {
  const [page, setPage] = React.useState(0);
  // const t = useTranslations('MainPage');

  const handleShowLoader = () => {
    Loader.show();
    setTimeout(() => {
      Loader.hide();
    }, 2000);
  };

  return (
    <div className={styles.example}>
      <h3>{dict.title}</h3>
      <div className={styles.example__btns}>
        <button className="button" onClick={handleShowLoader}>
          {dict.buttonForLoader}
        </button>
        <button className="button" onClick={() => Modal.show(<h3>{dict.modalText}</h3>)}>
          {dict.buttonForModal}
        </button>
        <button className="button" onClick={() => Message.show(dict.messageText, 'regular')}>
          {dict.buttonForMessage}
        </button>
        <Select
          options={[dict.option1, dict.option2, dict.option3]}
          name="select"
          placeholder={dict.selectPlaceholder}
          defaultValue={dict.option1}
          onChange={value => console.log(value)}
        />
        <Pagination page={page} total={100} pageSize={10} onChange={setPage} />
      </div>
    </div>
  );
}

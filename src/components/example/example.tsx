'use client';

import React from 'react';
import { Message } from '~/components/message/message';
import { Modal } from '~/components/modal/modal';
import { Loader } from '../loader/loader';
import Pagination from '../pagination/pagination';
import { Select } from '../select/select';

import styles from './example.module.css';

export function Example() {
  const [page, setPage] = React.useState(0);

  const handleShowLoader = () => {
    Loader.show();
    setTimeout(() => {
      Loader.hide();
    }, 2000);
  };

  return (
    <div className={styles.example}>
      <h3>Component usage examples</h3>
      <div className={styles.example__btns}>
        <button className="button" onClick={handleShowLoader}>
          Show loader
        </button>
        <button className="button" onClick={() => Modal.show(<h3>Modal example</h3>)}>
          Show modal
        </button>
        <button className="button" onClick={() => Message.show('Example message', 'regular')}>
          Show message
        </button>
        <Select
          options={['Option 1', 'Option 2', 'Option 3']}
          name="select"
          placeholder="Select option"
          defaultValue="Option 1"
          onChange={value => console.log(value)}
        />
        <Pagination page={page} total={100} pageSize={10} onChange={setPage} />
      </div>
    </div>
  );
}

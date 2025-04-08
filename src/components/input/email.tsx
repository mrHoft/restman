import { PATTERN } from './pattern';

import styles from './input.module.css';

export function InputEmail({ placeholder }: { placeholder: string }) {
  return (
    <div className={styles.container}>
      <input className={styles.input} type="email" name="email" placeholder=" " pattern={PATTERN.email} required />
      <div className={styles.input__placeholder}>{placeholder}</div>
      <div className={styles.input__valid}>&#x2714;</div>
    </div>
  );
}

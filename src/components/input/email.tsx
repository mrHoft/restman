import { PATTERN } from './pattern';

import styles from './input.module.css';

export function InputEmail() {
  return (
    <div className={styles.container}>
      <input className={styles.input} type="email" name="email" placeholder=" " pattern={PATTERN.email} required />
      <div className={styles.input__placeholder}>Email</div>
      <div className={styles.input__valid}>&#x2714;</div>
    </div>
  );
}

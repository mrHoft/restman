import { useTranslations } from 'next-intl';
import { PATTERN } from './pattern';

import styles from './input.module.css';

export function InputEmail() {
  const t = useTranslations('RegisterPage');
  return (
    <div className={styles.container}>
      <input className={styles.input} type="email" name="email" placeholder=" " pattern={PATTERN.email} required />
      <div className={styles.input__placeholder}>{t('email')}</div>
      <div className={styles.input__valid}>&#x2714;</div>
    </div>
  );
}

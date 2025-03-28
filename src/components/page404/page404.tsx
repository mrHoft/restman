import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './page404.module.css';

export default function Page404() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className={styles.page404}>
      <h2>{t('title')}</h2>
      <div className={styles.page404__image} />
      <Link className={styles.page404__link} href="/">
        {t('linkToMain')}
      </Link>
    </div>
  );
}

import Link from 'next/link';

import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="https://github.com/daytec-org/rest-client-app">
        <div className={`${styles.footer__logo} ${styles.github}`} />
      </Link>
      <div>2025</div>
      <Link href="https://rs.school/courses/reactjs">
        <div className={`${styles.footer__logo} ${styles.rss}`} />
      </Link>
    </footer>
  );
}

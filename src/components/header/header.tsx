import Link from 'next/link';
import ThemeSwitcher from '~/components/theme/theme';

import styles from './header.module.css';

const logoSrc = '/logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__title}>
        <div className={styles.header__logo} />
        <h3>Restman</h3>
      </Link>
      <ThemeSwitcher />
    </header>
  );
}

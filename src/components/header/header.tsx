'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ThemeSwitcher from '~/components/theme/theme';
import LanguageSelector from '../language/language';
import SignOutButton from '../signOut/signOut';

import styles from './header.module.css';

export function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={isSticky ? `${styles.header} ${styles.header_sticky}` : styles.header}>
      <Link href="/" className={styles.header__title}>
        <div className={styles.header__logo} />
        <h3 className={styles.header__title_text}>Restman</h3>
      </Link>
      <div className={styles.header__right}>
        <LanguageSelector />
        <SignOutButton />
        <ThemeSwitcher />
      </div>
    </header>
  );
}

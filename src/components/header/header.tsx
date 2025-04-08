'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import LanguageSelector from '~/components/language/language';
import { ButtonLogout } from '~/components/logout/logout';
import ThemeSwitcher from '~/components/theme/theme';
import type { UserData } from '~/utils/supabase/types';

import styles from './header.module.css';

export function Header({ dict, user }: { dict: Record<string, string>; user: UserData | null }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 16);
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
        {user ? (
          <Link href="/" className={`button ${styles.header__link}`}>
            {dict.mainPage}
          </Link>
        ) : (
          <Link href="/register" className={`button ${styles.header__link}`}>
            {dict.signUp}
          </Link>
        )}
        <ButtonLogout dict={dict} user={user} />
        <LanguageSelector />
        <ThemeSwitcher />
      </div>
    </header>
  );
}

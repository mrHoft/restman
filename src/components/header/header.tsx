'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { UserInfo } from '~/app/auth/types';
import LanguageSelector from '~/components/language/language';
import ThemeSwitcher from '~/components/theme/theme';
import { UserMenu } from '~/components/userMenu/menu';

import styles from './header.module.css';

export function Header({
  dict,
  locale,
  user,
}: {
  dict: Record<string, string>;
  locale: string;
  user: UserInfo | null;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.header_scrolled : ''}`}>
      <Link scroll={false} href={`/${locale}`} className={styles.header__title}>
        <div className={styles.header__logo} />
        <h3 className={styles.header__title_text}>Restman</h3>
      </Link>
      <div className={styles.header__right}>
        <UserMenu dict={dict} locale={locale} user={user} />
        <LanguageSelector />
        <ThemeSwitcher />
      </div>
    </header>
  );
}

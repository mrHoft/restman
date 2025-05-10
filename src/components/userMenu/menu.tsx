import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { deleteSession } from '~/app/auth/session';
import type { UserInfo } from '~/app/auth/types';

import styles from './menu.module.css';

interface UserMenuProps {
  dict: Record<string, string>;
  locale: string;
  user: UserInfo | null;
}

export function UserMenu({ dict, locale, user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMenuToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  const handleSingOut = () => {
    setIsOpen(false);
    deleteSession();
  };

  return (
    <div className={styles.user} ref={menuRef}>
      <div className={styles.user__btn} onClick={handleMenuToggle}>
        {!user ? (
          <img className={styles.user__btn_icon} src="/icons/user.svg" alt="user icon" />
        ) : (
          <Image width={32} height={32} className={styles.user__btn_avatar} src={user.avatar_url} alt="user icon" />
        )}
      </div>
      {isOpen && (
        <div className={styles.user__menu}>
          {user ? (
            <>
              <div className={styles.user__menu_name}>{user.name}</div>
              <div className={`${styles.user__menu_item} ${styles.out}`} onClick={handleSingOut}>
                {dict.logout}
              </div>
            </>
          ) : (
            <>
              <div className={styles.user__menu_name}>Anonymous</div>
              <Link
                className={`${styles.user__menu_item} ${styles.in}`}
                scroll={false}
                href={`/${locale}/login`}
                onClick={handleMenuClose}
              >
                {dict.login}
              </Link>
              <Link
                className={`${styles.user__menu_item} ${styles.plus}`}
                scroll={false}
                href={`/${locale}/register`}
                onClick={handleMenuClose}
              >
                {dict.signUp}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

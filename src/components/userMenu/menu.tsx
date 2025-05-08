import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const path = usePathname();

  useEffect(() => {
    closeMenu();
  }, [path]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSingOut = () => {
    deleteSession();
  };

  return (
    <div className={styles.user_menu} ref={menuRef}>
      <div className={styles.user_menu_wrapper} onClick={toggleMenu}>
        {!user ? (
          <img className={styles.user_menu_icon} src="/icons/user.svg" alt="user icon" />
        ) : (
          <img className={styles.user_menu_avatar} src={user.avatar_url} alt="user icon" />
        )}
      </div>
      {isOpen && (
        <div className={styles.user_menu_open}>
          {user ? (
            <>
              <div className={styles.user_menu_name}>{user.name}</div>
              <div className={`${styles.user_menu_item} ${styles.out}`} onClick={handleSingOut}>
                {dict.logout}
              </div>
            </>
          ) : (
            <>
              <div className={styles.user_menu_name}>Anonymous</div>
              <Link className={`${styles.user_menu_item} ${styles.in}`} scroll={false} href={`/${locale}/login`}>
                {dict.login}
              </Link>
              <Link className={styles.user_menu_item} scroll={false} href={`/${locale}/register`} onClick={closeMenu}>
                {dict.signUp}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

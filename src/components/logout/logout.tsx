import Link from 'next/link';
import { deleteSession } from '~/app/auth/session';
import type { UserInfo } from '~/app/auth/types';

import styles from './logout.module.css';

interface ButtonLogoutProps {
  dict: Record<string, string>;
  locale: string;
  user: UserInfo | null;
}

export function ButtonLogout({ dict, locale, user }: ButtonLogoutProps) {
  const handleSingOut = async () => {
    deleteSession();
  };

  if (!user)
    return (
      <Link scroll={false} href={`/${locale}/login`}>
        <button className={`button ${styles.sign} ${styles.in}`}>{dict.login}</button>
      </Link>
    );

  return (
    <form action={handleSingOut}>
      <button className={`button ${styles.sign} ${styles.out}`}>{dict.logout}</button>
    </form>
  );
}

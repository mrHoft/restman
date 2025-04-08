import Link from 'next/link';
import { signout } from '~/app/auth/actions';
import type { UserData } from '~/utils/supabase/types';

import styles from './logout.module.css';

interface ButtonLogoutProps {
  dict: Record<string, string>;
  locale: string;
  user: UserData | null;
}

export function ButtonLogout({ dict, locale, user }: ButtonLogoutProps) {
  if (!user)
    return (
      <Link href={`/${locale}/login`}>
        <button className={`${styles.sign} ${styles.in}`}>{dict.login}</button>
      </Link>
    );

  return (
    <form action={signout}>
      <button className={`${styles.sign} ${styles.out}`}>{dict.logout}</button>
    </form>
  );
}

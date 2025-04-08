import Link from 'next/link';
import { signout } from '~/app/auth/actions';
import type { UserData } from '~/utils/supabase/types';

import styles from './logout.module.css';

export function ButtonLogout({ dict, user }: { dict: Record<string, string>; user: UserData | null }) {
  if (!user)
    return (
      <Link href="/login">
        <button className={`${styles.sign} ${styles.in}`}>{dict.login}</button>
      </Link>
    );

  return (
    <form action={signout}>
      <button className={`${styles.sign} ${styles.out}`}>{dict.logout}</button>
    </form>
  );
}

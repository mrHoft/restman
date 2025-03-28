import Link from 'next/link';
import { signout } from '~/app/auth/actions';
import type { UserData } from '~/utils/supabase/types';

import styles from './logout.module.css';

export function ButtonLogout({ user }: { user: UserData | null }) {
  if (!user)
    return (
      <Link href="/login">
        <button className={`${styles.sign} ${styles.in}`}>Login</button>
      </Link>
    );

  return (
    <form action={signout}>
      <button className={`${styles.sign} ${styles.out}`}>Logout</button>
    </form>
  );
}

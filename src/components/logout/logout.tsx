import { redirect } from 'next/navigation';
import { signout } from '~/app/auth/actions';
import type { UserData } from '~/utils/supabase/types';

import styles from './logout.module.css';

export function ButtonLogout({ user }: { user: UserData | null }) {
  return (
    <form action={user ? signout : () => redirect('/login')}>
      <button className={`${styles.sign} ${user ? styles.out : styles.in}`}></button>
    </form>
  );
}

import Link from 'next/link';
import { signout } from '~/app/auth/actions';
import ThemeSwitcher from '~/components/theme/theme';
import { createClient } from '~/utils/supabase/server';

import styles from './header.module.css';

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__title}>
        <div className={styles.header__logo} />
        <h3>Restman</h3>
      </Link>
      {!user ? (
        <nav className={styles.header__links}>
          <Link href="/register" className={`button ${styles.header__link}`}>
            Register
          </Link>
          <Link href="/login" className={`button ${styles.header__link}`}>
            Login
          </Link>
        </nav>
      ) : (
        <>
          <h2 className={styles.header__user}>{user.email}</h2>
          <form action={signout}>
            <button className="button">Sign out</button>
          </form>
        </>
      )}
      <ThemeSwitcher />
    </header>
  );
}

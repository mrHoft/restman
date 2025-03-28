import Link from 'next/link';
import { createClient } from '~/utils/supabase/server';

import styles from './welcome.module.css';

export async function Welcome() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user)
    return (
      <div className={styles.welcome}>
        <h2>Welcome Back, {user.email}!</h2>
        <div className="align_center">
          <Link href="/rest" className={`button ${styles.welcome__link}`}>
            REST Client
          </Link>
          <Link href="/history" className={`button ${styles.welcome__link}`}>
            History
          </Link>
          <Link href="/variables" className={`button ${styles.welcome__link}`}>
            Variables
          </Link>
        </div>
      </div>
    );

  return (
    <div className={styles.welcome}>
      <h2>Welcome</h2>
      <div className="align_center">
        <Link href="/login" className={`button ${styles.welcome__link}`}>
          Login
        </Link>
        <Link href="/register" className={`button ${styles.welcome__link}`}>
          Register
        </Link>
      </div>
    </div>
  );
}

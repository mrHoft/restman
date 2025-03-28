import Link from 'next/link';
import { getUser } from '~/app/auth/actions';

import form from '~/styles/form.module.css';

export async function Welcome() {
  const user = await getUser();

  return (
    <div className={form.container}>
      {user ? (
        <>
          <h2 className={form.title}>Welcome Back, {user.email}!</h2>
          <div className="align_center">
            <Link href="/rest" className="button">
              REST Client
            </Link>
            <Link href="/history" className="button">
              History
            </Link>
            <Link href="/variables" className="button">
              Variables
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2 className={form.title}>Welcome</h2>
          <div className="align_center">
            <Link href="/login" className="button">
              Login
            </Link>
            <Link href="/register" className="button">
              Sign up
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

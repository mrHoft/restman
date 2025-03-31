import Link from 'next/link';
import { getUser } from '~/app/auth/actions';

import form from '~/styles/form.module.css';

export async function Welcome({ dict }: { dict: Record<string, string> }) {
  const user = await getUser();

  return (
    <div className={form.container}>
      {user ? (
        <>
          <h2 className={form.title}>
            {dict.greetingWithUser} {user.email}!
          </h2>
          <div className="align_center">
            <Link href="/client" className="button">
              {dict.restClient}
            </Link>
            <Link href="/history" className="button">
              {dict.history}
            </Link>
            <Link href="/variables" className="button">
              {dict.variables}
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2 className={form.title}>{dict.greetingWithoutUser}</h2>
          <div className="align_center">
            <Link href="/login" className="button">
              {dict.login}
            </Link>
            <Link href="/register" className="button">
              {dict.signUp}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

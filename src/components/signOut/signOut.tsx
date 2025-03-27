import { signout } from '~/app/auth/actions';
import styles from './signOut.module.css';

export default function SignOutButton() {
  return (
    <form action={signout}>
      <button className={styles.sign_out}></button>
    </form>
  );
}

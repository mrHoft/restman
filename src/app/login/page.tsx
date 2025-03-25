import styles from '~/styles/input.module.css';

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input className={styles.input} type="email" name="email" placeholder="Email" />
        <input className={styles.input} type="password" name="password" placeholder="Password" />
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

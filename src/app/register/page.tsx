import styles from '~/styles/input.module.css';

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <input className={styles.input} type="email" name="email" placeholder="Email" />
        <input className={styles.input} type="password" name="password" placeholder="Password" />
        <input className={styles.input} type="password" name="confirmPassword" placeholder="Confirm password" />
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

import form from '~/styles/form.module.css';

export default function Register() {
  return (
    <div className={form.container}>
      <h1 className={form.title}>Register</h1>
      <form className={form.form}>
        <input className={form.input} type="email" name="email" placeholder="Email" />
        <input className={form.input} type="password" name="password" placeholder="Password" />
        <input className={form.input} type="password" name="confirmPassword" placeholder="Confirm password" />
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

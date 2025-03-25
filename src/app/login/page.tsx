import form from '~/styles/form.module.css';

export default function Login() {
  return (
    <div className={form.container}>
      <h1 className={form.title}>Login</h1>
      <form className={form.form}>
        <input className={form.input} type="email" name="email" placeholder="Email" />
        <input className={form.input} type="password" name="password" placeholder="Password" />
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

import { InputPassword } from '~/components/password/password';

import form from '~/styles/form.module.css';

export default function Register() {
  return (
    <div className={form.container}>
      <h1 className={form.title}>Register</h1>
      <form className={form.form}>
        <input className={form.input} type="email" name="email" placeholder="Email" />
        <InputPassword name="password" placeholder="Password" />
        <InputPassword name="confirmPassword" placeholder="Confirm password" />
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

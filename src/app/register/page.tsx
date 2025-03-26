import { InputEmail, InputPassword } from '~/components/input';

import form from '~/styles/form.module.css';

export default function Register() {
  return (
    <div className={form.container}>
      <h1 className={form.title}>Register</h1>
      <form className={form.form}>
        <InputEmail />
        <InputPassword name="password" placeholder="Password" />
        <InputPassword name="confirmPassword" placeholder="Confirm password" />
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

'use client';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { login } from '~/app/auth/actions';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
import { loginSchema } from '~/utils/schemas';

import form from '~/styles/form.module.css';

export default function Login() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    Loader.show();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        const path = issue.path.join('.');
        errors[path] = issue.message;
      });
      setErrors(errors);
      Loader.hide();
      return;
    }

    await login(data).then(({ error, success }) => {
      Message.show(success ? "You've successfully logged in!" : error, success ? 'regular' : 'error');
      Loader.hide();
      redirect('/');
    });
  };

  return (
    <div className={form.container}>
      <h1 className={form.title}>Login</h1>
      <form className={form.form} onSubmit={handleSubmit}>
        <div className={form.input_group}>
          <input className={form.input} type="email" name="email" placeholder="Email" />
          {errors.email && <span className={form.input_error}>{errors.email}</span>}
        </div>
        <div className={form.input_group}>
          <input className={form.input} type="password" name="password" placeholder="Password" />
          {errors.password && <span className={form.input_error}>{errors.password}</span>}
        </div>
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

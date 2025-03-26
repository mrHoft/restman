'use client';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { register } from '~/app/auth/actions';
import form from '~/styles/form.module.css';
import { Loader } from '../../components/loader/loader';
import { Message } from '../../components/message/message';
import { registerSchema } from '../../utils/schemas';

export default function Register() {
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

    const result = registerSchema.safeParse(data);
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

    await register(data).then(({ error, success }) => {
      Message.show(success ? 'Registration successful!' : error, success ? 'regular' : 'error');
      Loader.hide();
      redirect('/login');
    });
  };

  return (
    <div className={form.container}>
      <h1 className={form.title}>Register</h1>
      <form className={form.form} onSubmit={handleSubmit}>
        <div className={form.input_group}>
          <input className={form.input} type="email" name="email" placeholder="Email" />
          {errors.email && <span className={form.input_error}>{errors.email}</span>}
        </div>
        <div className={form.input_group}>
          <input className={form.input} type="password" name="password" placeholder="Password" />
          {errors.password && <span className={form.input_error}>{errors.password}</span>}
        </div>
        <div className={form.input_group}>
          <input className={form.input} type="password" name="confirmPassword" placeholder="Confirm password" />
          {errors.confirmPassword && <span className={form.input_error}>{errors.confirmPassword}</span>}
        </div>
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

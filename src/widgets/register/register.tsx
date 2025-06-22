'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { InputEmail, InputPassword } from '~/components/input';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
import { registerSchema } from '~/utils/schemas';

import form from '~/styles/form.module.css';

export default function Register({ dict, locale }: { dict: Record<string, string>; locale: string }) {
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

    Message.show(dict.disabledCredentials, 'error');
    Loader.hide();
  };

  useEffect(Loader.hide, []);

  return (
    <div className={form.container}>
      <h1 className={form.title}>{dict.title}</h1>
      <form className={form.form} onSubmit={handleSubmit}>
        <InputEmail placeholder={dict.email} />
        <span className={form.input_error}>{errors.email}</span>
        <InputPassword name="password" placeholder={dict.password} />
        <span className={form.input_error}>{errors.password}</span>
        <InputPassword name="confirmPassword" placeholder={dict.confirmPassword} />
        <span className={form.input_error}>{errors.confirmPassword}</span>
        <p>{dict.disabledCredentials}</p>
        <div className={form.form__btns}>
          <button className="button" type="submit">
            {dict.submit}
          </button>
          <Link scroll={false} href={`/${locale}/login`} className="button">
            {dict.buttonToLogin}
          </Link>
        </div>
      </form>
    </div>
  );
}

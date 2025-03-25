'use client';

import { useState } from 'react';

import form from '~/styles/form.module.css';
import styles from './password.module.css';

export function InputPassword({ name, placeholder }: { name: string; placeholder: string }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.password}>
      <input className={form.input} type={showPassword ? 'text' : 'password'} name={name} placeholder={placeholder} />
      <label className={styles.password__show} htmlFor={`show_${name}`}>
        <input type="checkbox" name={`show_${name}`} id={`show_${name}`} onChange={handleChange} />
      </label>
    </div>
  );
}

'use client';

import { useRef, useState, type FormEvent } from 'react';
import { PATTERN } from './pattern';

import styles from './input.module.css';

const passwordValidity = (value: string) => {
  let matches = 0;
  if (value.match(/[0-9]/)) matches += 1;
  if (value.match(/[A-ZА-Я]/)) matches += 1;
  if (value.match(/[a-zа-я]/)) matches += 1;
  if (value.match(/[\\-_#$%@&!=\\.\\?\\^\\*\\+\\{\\|\\}\\~]/)) matches += 1;
  if (value.length > 7) matches += 1;
  return matches;
};

export function InputPassword({ name, placeholder }: { name: string; placeholder: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const strength = useRef<HTMLDivElement>(null);

  const handleChange = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    if (strength.current) {
      const matches = passwordValidity(event.currentTarget.value);
      strength.current.setAttribute(
        'style',
        `height:0.3rem;width:${(100 / 5) * matches}%;background-color:${matches > 4 ? 'green' : 'red'};`
      );
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <input
          className={styles.password}
          type={showPassword ? 'text' : 'password'}
          name={name}
          placeholder=" "
          pattern={PATTERN.password}
          onInput={handleInput}
          required
        />
        <div ref={strength} style={{ height: '5px' }} />
        <label className={styles.password__show} htmlFor={`show_${name}`}>
          <input type="checkbox" name={`show_${name}`} id={`show_${name}`} onChange={handleChange} />
        </label>
        <div className={styles.input__placeholder}>{placeholder}</div>
        <div className={styles.password__valid}>&#x2714;</div>
      </div>
    </div>
  );
}

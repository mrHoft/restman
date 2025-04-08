import { useParams, usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

import { useLocale } from '~/entities/useLocale';
import styles from './language.module.css';

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { setLocale } = useLocale();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    const newPath = pathname.replace(`/${params.locale}`, `/${nextLocale}`);
    router.replace(newPath);
    setLocale(nextLocale);
  }
  return (
    <div className={styles.language}>
      <select
        className={`${styles.language__select} ${styles[String(params.locale)]}`}
        onChange={onSelectChange}
        defaultValue={params.locale}
      >
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
    </div>
  );
}

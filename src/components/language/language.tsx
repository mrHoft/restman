import { useParams, usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import styles from './language.module.css';

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    const newPath = pathname.replace(`/${params.locale}`, `/${nextLocale}`);
    router.replace(newPath);
  }
  return (
    <div className={styles.language__selector}>
      <select
        className={`${styles.language__switcher} ${params.locale === 'en' ? styles.en : styles.ru}`}
        onChange={onSelectChange}
        defaultValue={params.locale}
      >
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
    </div>
  );
}

import styles from './language.module.css';

export default function LanguageSelector() {
  return (
    <select className={styles.language__select} name="language" id="language">
      <option value="EN">EN</option>
      <option value="RU">RU</option>
    </select>
  );
}

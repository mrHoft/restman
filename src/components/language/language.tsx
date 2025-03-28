import styles from './language.module.css';

export default function LanguageSelector() {
  return (
    <div className={styles.language__selector}>
      <select className={`${styles.language__switcher} ${styles.ru}`}>
        <option>EN</option>
        <option>RU</option>
      </select>
    </div>
  );
}

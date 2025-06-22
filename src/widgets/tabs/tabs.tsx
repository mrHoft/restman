import { useState } from 'react';
import styles from './tabs.module.css';

export interface Tab {
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs, grow }: { tabs: Tab[], grow?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={grow ? `${styles.tabs} ${styles.tabs__grow}` : styles.tabs}>
      <div className={styles.tabs__header}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={index === activeIndex ? `${styles.tabs__button} ${styles.active}` : styles.tabs__button}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabs__content}>{tabs[activeIndex].content}</div>
    </div>
  );
}

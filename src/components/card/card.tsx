import Link from 'next/link';

import styles from './card.module.css';

interface CardProps {
  image: string;
  link: string;
  name: string;
  role: string;
  about: string;
}

export default function Card({ image, link, name, role, about }: CardProps) {
  return (
    <div className={styles.card}>
      <img className={styles.card__avatar} src={image} alt="avatar" />

      <Link className={styles.card__name} href={link}>
        {name}
      </Link>
      <div>{role}</div>
      <div>{about}</div>
    </div>
  );
}

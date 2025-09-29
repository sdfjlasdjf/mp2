import styles from './Card.module.css';

export default function Card(props: { title: string; subtitle?: string; img?: string; onClick?: () => void; }){
  const { title, subtitle, img, onClick } = props;
  return (
    <button className={styles.card} onClick={onClick} aria-label={title}>
      {img && <div className={styles.media}><img src={img} alt={title}/></div>}
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
    </button>
  );
}

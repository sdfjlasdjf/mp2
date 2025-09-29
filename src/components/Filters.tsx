import styles from './Filters.module.css';

type Props = {
  options: string[];
  selected: Set<string>;
  toggle: (value: string)=>void;
  clear: ()=>void;
};

export default function Filters({ options, selected, toggle, clear }: Props){
  return (
    <div className={styles.panel}>
      <div className={styles.head}>
        <span className="badge">Filter by type</span>
        <button className="btn" onClick={clear} disabled={!selected.size}>Clear</button>
      </div>
      <div className={styles.options}>
        {options.map(opt=> (
          <label key={opt} className={styles.chip}>
            <input
              type="checkbox"
              checked={selected.has(opt)}
              onChange={()=> toggle(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

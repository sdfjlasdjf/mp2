import styles from './SortControls.module.css';

type SortKey = 'name'|'id';
type Props = {
  sortKey: SortKey;
  setSortKey: (k: SortKey)=>void;
  order: 'asc'|'desc';
  setOrder: (o: 'asc'|'desc')=>void;
};

export default function SortControls({ sortKey, setSortKey, order, setOrder }: Props){
  return (
    <div className={styles.row} role="group" aria-label="Sort controls">
      <label className={styles.label}>Sort by</label>
      <select className="select" value={sortKey} onChange={e=> setSortKey(e.target.value as SortKey)}>
        <option value="name">Name</option>
        <option value="id">ID</option>
      </select>
      <button className="btn" onClick={()=> setOrder(order==='asc'?'desc':'asc')} aria-label="Toggle sort order">
        {order==='asc' ? 'Ascending ▲' : 'Descending ▼'}
      </button>
    </div>
  );
}

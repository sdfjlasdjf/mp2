import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SortControls from '../components/SortControls';
import Card from '../components/Card';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { fetchAllPokemonMeta, imgForId } from '../services/poke';
import type { PokemonListItem } from '../types';
import { useSelection } from '../state/SelectionContext';
import useDebounce from '../hooks/useDebounce';

type SortKey = 'name' | 'id';

export default function ListView(){
  const [all, setAll] = useState<PokemonListItem[]|null>(null);
  const [error, setError] = useState<string| null>(null);
  const [q, setQ] = useState('');
  const debounced = useDebounce(q, 150);

  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [order, setOrder] = useState<'asc'|'desc'>('asc');
  const navigate = useNavigate();
  const { setCollection } = useSelection();

  useEffect(()=>{
    fetchAllPokemonMeta().then(setAll).catch(e=> setError(String(e)));
  }, []);

  const filtered = useMemo(()=>{
    const base = all ?? [];
    const term = debounced.trim().toLowerCase();
    let arr = term ? base.filter(p=> p.name.includes(term) || String(p.id)===term) : base.slice(0, 500);
    arr.sort((a,b)=>{
      const dir = order==='asc' ? 1 : -1;
      if (sortKey==='name') return a.name.localeCompare(b.name) * dir;
      return (a.id - b.id) * dir;
    });
    return arr;
  }, [all, debounced, sortKey, order]);

  useEffect(()=>{
    // keep selection in sync for details prev/next
    setCollection(filtered.map(p=> p.id));
  }, [filtered, setCollection]);

  if(error) return <ErrorState message={error} />;
  if(!all) return <Loader label="Loading Pokédex..." />;

  return (
    <section className="section">
      <div className="screen-header">
        <h1>List View</h1>
        <span className="small">Showing {filtered.length} / {all.length}</span>
      </div>
      <div className="grid" style={{gridTemplateColumns:'1.2fr .8fr', gap:'1rem'}}>
        <SearchBar value={q} onChange={setQ} placeholder="Search by name or exact ID..." />
        <SortControls sortKey={sortKey} setSortKey={setSortKey} order={order} setOrder={setOrder} />
      </div>
      <div className="hr" />
      <div className="grid cards">
        {filtered.map(p=> (
          <Card
            key={p.id}
            title={`#${String(p.id).padStart(3,'0')} · ${capitalize(p.name)}`}
            subtitle="View details"
            img={imgForId(p.id)}
            onClick={()=> navigate(`/pokemon/${p.id}`)}
          />
        ))}
      </div>
    </section>
  );
}

function capitalize(s: string){ return s.charAt(0).toUpperCase()+s.slice(1); }

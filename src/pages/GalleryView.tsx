import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Filters from '../components/Filters';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { fetchTypes, fetchPokemonByType, imgForId } from '../services/poke';
import { useSelection } from '../state/SelectionContext';

export default function GalleryView(){
  const [types, setTypes] = useState<string[] | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [ids, setIds] = useState<number[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCollection } = useSelection();

  useEffect(()=>{
    fetchTypes().then(setTypes).catch(e=> setError(String(e)));
  }, []);

  useEffect(()=>{
    async function run(){
      setLoading(true);
      try {
        let result: number[] = [];
        if(!selected.size){
          // default gallery: first 151
          result = Array.from({length:151}, (_,i)=> i+1);
        } else {
          const lists = await Promise.all(Array.from(selected).map(t=> fetchPokemonByType(t)));
          // intersection: must match all selected types
          result = lists.reduce((acc, cur)=> acc.filter(x=> cur.includes(x)), lists[0] ?? []);
        }
        // limit to 300 to keep things snappy
        setIds(result.slice(0,300));
        setCollection(result.slice(0,300));
      } catch (e:any){
        setError(String(e));
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [selected, setCollection]);

  function toggle(val: string){
    const next = new Set(selected);
    if(next.has(val)) next.delete(val); else next.add(val);
    setSelected(next);
  }
  function clear(){ setSelected(new Set()); }

  if(error) return <ErrorState message={error} />;
  if(!types) return <Loader label="Loading filters..." />;

  return (
    <section className="section">
      <div className="screen-header">
        <h1>Gallery</h1>
        <span className="small">{selected.size? 'Showing Pokémon that have ALL selected types' : 'Showing Kanto starters + friends (first 151)'}</span>
      </div>

      <Filters options={types} selected={selected} toggle={toggle} clear={clear} />
      <div className="hr" />
      {loading ? <Loader label="Filtering..." /> : (
        <div className="grid cards">
          {ids.map(id=> (
            <Card
              key={id}
              title={`#${String(id).padStart(3,'0')}`}
              subtitle="Open details"
              img={imgForId(id)}
              onClick={()=> navigate(`/pokemon/${id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

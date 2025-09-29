import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { fetchPokemonDetail, imgForId } from '../services/poke';
import type { PokemonDetail } from '../types';
import styles from './DetailView.module.css';
import { useSelection } from '../state/SelectionContext';

export default function DetailView(){
  const { id: idParam } = useParams();
  const id = Number(idParam);
  const [data, setData] = useState<PokemonDetail | null>(null);
  const [error, setError] = useState<string|null>(null);
  const navigate = useNavigate();
  const { getPrevNext, ids } = useSelection();

  useEffect(()=>{
    setData(null); setError(null);
    fetchPokemonDetail(id).then(setData).catch(e=> setError(String(e)));
    const onKey = (e: KeyboardEvent)=>{
      if(e.key === 'ArrowLeft') goPrev();
      if(e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { prev, next } = useMemo(()=> getPrevNext(id), [id, getPrevNext]);

  function goPrev(){
    if(prev) navigate(`/pokemon/${prev}`);
  }
  function goNext(){
    if(next) navigate(`/pokemon/${next}`);
  }

  if(error) return <ErrorState message={error} />;
  if(!data) return <Loader label="Loading Pokémon..." />;

  return (
    <section className="section">
      <div className={styles.header}>
        <button className="btn" onClick={()=> navigate(-1)}>← Back</button>
        <div className={styles.spacer} />
        <button className="btn" onClick={goPrev} disabled={!prev}>◀ Prev</button>
        <button className="btn" onClick={goNext} disabled={!next}>Next ▶</button>
      </div>

      <div className={styles.wrap}>
        <div className={styles.media}>
          <img src={imgForId(data.id)} alt={data.name}/>
        </div>
        <div className={styles.info}>
          <h1>#{String(data.id).padStart(3,'0')} · {capitalize(data.name)}</h1>
          <div className="small">Use <span className="kbd">←</span> and <span className="kbd">→</span> to navigate</div>
          <div className="hr" />
          <dl className={styles.dl}>
            <div><dt>Height</dt><dd>{data.height}</dd></div>
            <div><dt>Weight</dt><dd>{data.weight}</dd></div>
            <div><dt>Base XP</dt><dd>{data.base_experience}</dd></div>
            <div><dt>Types</dt><dd className={styles.roll}>{data.types.map(t=> <span className="badge" key={t.type.name}>{t.type.name}</span>)}</dd></div>
            <div><dt>Abilities</dt><dd className={styles.roll}>{data.abilities.map(a=> <span className="badge" key={a.ability.name}>{a.ability.name}</span>)}</dd></div>
          </dl>
          <div className="hr" />
          <div className={styles.stats}>
            {data.stats.map(s=> (
              <div key={s.stat.name} className={styles.statRow}>
                <span className={styles.statName}>{s.stat.name}</span>
                <div className={styles.barOuter}>
                  <div className={styles.barInner} style={{width: Math.min(100, s.base_stat/1.5) + '%'}} />
                </div>
                <span className={styles.statVal}>{s.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function capitalize(s: string){ return s.charAt(0).toUpperCase()+s.slice(1); }

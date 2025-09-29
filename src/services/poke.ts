import { get } from './api';
import type { PokemonListItem, PokemonDetail } from '../types';

export function idFromUrl(url: string): number {
  const m = url.match(/\/pokemon\/(\d+)\/?$/);
  return m ? parseInt(m[1], 10) : -1;
}

export const imgForId = (id: number)=> `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export async function fetchAllPokemonMeta(): Promise<PokemonListItem[]>{
  const data = await get<{ count: number; results: { name: string; url: string }[] }>('pokemon?limit=2000');
  return data.results.map(r => ({ name: r.name, url: r.url, id: idFromUrl(r.url) }));
}

export async function fetchPokemonDetail(id: number): Promise<PokemonDetail>{
  return get<PokemonDetail>(`pokemon/${id}`);
}

export async function fetchTypes(): Promise<string[]>{
  const data = await get<{ results: { name: string; url: string }[] }>('type');
  // Filter out non-playable or special types if present
  return data.results.map(r=> r.name).filter(n=> !['unknown','shadow'].includes(n)).sort();
}

export async function fetchPokemonByType(type: string): Promise<number[]>{
  const data = await get<{ pokemon: { pokemon: { name: string; url: string } }[] }>(`type/${type}`);
  return data.pokemon.map(p=> p.pokemon.url).map(idFromUrl);
}

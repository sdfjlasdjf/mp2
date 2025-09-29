import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 15000,
});

// simple in-memory cache
const cache = new Map<string, any>();
export async function get<T=any>(url: string): Promise<T>{
  if(cache.has(url)) return cache.get(url);
  const { data } = await api.get<T>(url);
  cache.set(url, data);
  return data;
}

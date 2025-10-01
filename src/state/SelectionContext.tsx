import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

type Ctx = {
  ids: number[];
  setCollection: (ids: number[]) => void;
  currentIndexOf: (id: number) => number;
  getPrevNext: (id: number) => { prev: number | null; next: number | null };
};

const SelectionCtx = createContext<Ctx | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);

  const setCollection = useCallback((arr: number[]) => {
    setIds(prev => {
      if (prev.length === arr.length && prev.every((v, i) => v === arr[i])) {
        return prev; 
      }
      return arr;
    });
  }, []);

  const currentIndexOf = useCallback((id: number) => ids.indexOf(id), [ids]);

  const getPrevNext = useCallback((id: number) => {
    if (!ids.length) return { prev: null, next: null };
    const idx = ids.indexOf(id);
    if (idx === -1) return { prev: null, next: null };
    return {
      prev: idx > 0 ? ids[idx - 1] : null,
      next: idx < ids.length - 1 ? ids[idx + 1] : null,
    };
  }, [ids]);

  const value = useMemo(
    () => ({ ids, setCollection, currentIndexOf, getPrevNext }),
    [ids, setCollection, currentIndexOf, getPrevNext]
  );

  return <SelectionCtx.Provider value={value}>{children}</SelectionCtx.Provider>;
}

export function useSelection() {
  const ctx = useContext(SelectionCtx);
  if (!ctx) throw new Error('SelectionContext not found');
  return ctx;
}

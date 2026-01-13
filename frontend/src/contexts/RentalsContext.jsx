import { createContext, useContext, useMemo, useState } from "react";

const KEY = "rentedMovieIds_v1";

function readIds() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return [];
  }
}

function writeIds(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}

const RentalsContext = createContext(null);

export function RentalsProvider({ children }) {
  const [rentedIds, setRentedIds] = useState(() => readIds());

  const rent = (id) => {
    const sid = String(id);
    setRentedIds((prev) => {
      if (prev.includes(sid)) return prev;
      const next = [...prev, sid];
      writeIds(next);
      return next;
    });
  };

  const cancel = (id) => {
    const sid = String(id);
    setRentedIds((prev) => {
      const next = prev.filter((x) => x !== sid);
      writeIds(next);
      return next;
    });
  };

  const value = useMemo(
    () => ({
      rentedIds,
      isRented: (id) => rentedIds.includes(String(id)),
      rent,
      cancel,
    }),
    [rentedIds]
  );

  return <RentalsContext.Provider value={value}>{children}</RentalsContext.Provider>;
}

export function useRentals() {
  const ctx = useContext(RentalsContext);
  if (!ctx) throw new Error("useRentals must be used within RentalsProvider");
  return ctx;
}

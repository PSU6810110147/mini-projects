// src/utils/rentals.js
const KEY = "rentedMovieIds_v1";

export function getRentedIds() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return [];
  }
}

export function isRented(id) {
  const ids = getRentedIds();
  return ids.includes(String(id));
}

export function rentMovie(id) {
  const ids = getRentedIds();
  const sid = String(id);
  if (ids.includes(sid)) return ids; // กันเช่าซ้ำ
  const next = [...ids, sid];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function cancelRent(id) {
  const ids = getRentedIds();
  const sid = String(id);
  const next = ids.filter((x) => x !== sid);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

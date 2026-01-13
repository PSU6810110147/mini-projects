const KEY = "rentedMovieIds";

export function getRentedIds() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function isRented(movieId) {
  const idNum = Number(movieId);
  return getRentedIds().includes(idNum);
}

export function rentMovie(movieId) {
  const idNum = Number(movieId);
  const current = getRentedIds();
  if (!current.includes(idNum)) {
    current.push(idNum);
    localStorage.setItem(KEY, JSON.stringify(current));
  }
  return current;
}

export function unRentMovie(movieId) {
  const idNum = Number(movieId);
  const next = getRentedIds().filter((x) => x !== idNum);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

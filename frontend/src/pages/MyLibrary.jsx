import { movies } from "../data/movies";
import { Link } from "react-router-dom";

export default function Library() {
  const rentedIds = JSON.parse(localStorage.getItem("rentedMovies")) || [];
  const rentedMovies = movies.filter(m => rentedIds.includes(m.id));

  return (
    <div className="container">
      <h2>🎬 คลังของฉัน</h2>

      {rentedMovies.length === 0 ? (
        <>
          <p>ยังไม่มีหนังที่เช่าไว้</p>
          <Link to="/home" className="btn">กลับหน้าแรก</Link>
        </>
      ) : (
        <div className="movieGrid">
          {rentedMovies.map(m => (
            <Link to={`/movie/${m.id}`} key={m.id} className="movieCard">
              <img src={m.poster} alt={m.title} />
              <p>{m.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

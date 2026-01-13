import { useNavigate } from "react-router-dom";
import { movies } from "../data/movies";
import { useRentals } from "../contexts/RentalsContext";

export default function Movies() {
  const navigate = useNavigate();
  const { isRented, rent } = useRentals();

  return (
    <main className="container">
      <h1 style={{ marginBottom: 16 }}>หนังทั้งหมด</h1>

      <div className="grid">
        {movies.map((m) => {
          const rented = isRented(m.id);

          return (
            <div key={m.id} className="card">
              <div className="posterWrap" onClick={() => navigate(`/movie/${m.id}`)}>
                <img className="poster" src={m.poster} alt={m.title} />
                {rented && <div className="badge">เช่าแล้ว ✅</div>}
              </div>

              <div className="cardBody">
                <div className="titleRow">
                  <h3 className="title">{m.title}</h3>
                </div>

                <div className="meta">
                  {m.year} • ⭐ {m.rating} • {m.type}
                </div>

                <div className="actions">
                  <button className="btn" onClick={() => navigate(`/movie/${m.id}`)}>
                    รายละเอียด
                  </button>

                  <button
                    className={`btn ${rented ? "btnDisabled" : ""}`}
                    onClick={() => rent(m.id)}
                    disabled={rented}
                    title={rented ? "เช่าแล้ว" : "เช่าหนัง"}
                  >
                    {rented ? "เช่าแล้ว" : "เช่า"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

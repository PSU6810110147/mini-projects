import { movies } from "../data/movies";
import { useRentals } from "../contexts/RentalsContext";
import { useNavigate } from "react-router-dom";

export default function Library() {
  const navigate = useNavigate();
  const { isRented, cancel } = useRentals();

  const rentedMovies = movies.filter((m) => isRented(m.id));

  return (
    <main className="container">
      <h1 style={{ color: "#fff", marginBottom: 8 }}>คลังของฉัน</h1>
      <p style={{ color: "rgba(255,255,255,.7)", marginBottom: 16 }}>
        รายการหนังที่คุณเช่าไว้
      </p>

      {rentedMovies.length === 0 ? (
        <div style={{ color: "#fff" }}>ยังไม่มีหนังที่เช่าไว้</div>
      ) : (
        <div className="grid">
          {rentedMovies.map((m) => (
            <div key={m.id} className="card">
              <div className="posterWrap" onClick={() => navigate(`/movie/${m.id}`)} style={{ cursor: "pointer" }}>
                <img className="poster" src={m.poster} alt={m.title} />
                <div className="badge">เช่าแล้ว ✅</div>
              </div>

              <div className="cardBody">
                <h3 className="title">{m.title}</h3>
                <div className="meta">
                  {m.year} • ⭐ {m.rating} • {m.type}
                </div>

                <div className="actions">
                  <button className="btn" onClick={() => navigate(`/movie/${m.id}`)}>
                    รายละเอียด
                  </button>

                  <button className="btn danger" onClick={() => cancel(m.id)}>
                    ยกเลิกเช่า
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

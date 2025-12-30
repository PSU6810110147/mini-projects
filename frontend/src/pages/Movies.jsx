import { Link } from "react-router-dom";
import { movies } from "../data/movies";
import logo from "../assets/logo.png";

export default function Movies() {
  return (
    <>
      <header className="nav">
        <div className="container navInner">
          <Link to="/home" className="brand">
            <img src={logo} alt="Mini-Project-Movie" className="brandLogo" />
            <div>Mini-Project-Movie</div>
          </Link>

          <nav className="menu">
            <Link to="/home">หน้าแรก</Link>
            <Link to="/movies">ทั้งหมด</Link>
          </nav>
        </div>
      </header>

      <main className="container" style={{ paddingTop: 16 }}>
        <h1 style={{ margin: "10px 0 6px" }}>ทั้งหมด</h1>
        <p style={{ margin: 0, color: "rgba(255,255,255,.65)", fontWeight: 800 }}>
          คลิกการ์ดเพื่อเข้าหน้า Detail
        </p>

        <div className="grid">
          {movies.map((m) => (
            <Link key={m.id} to={`/movies/${m.id}`} className="card">
              <div className="cardPoster">
                <img src={m.poster} alt={m.title} />
              </div>
              <div className="cardBody">
                <p className="cardTitle">{m.title}</p>
                <div className="cardMeta">
                  <span>{m.year}</span>
                  <span>⭐ {m.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="footer">© Mini-Project-Movie</div>
      </main>
    </>
  );
}

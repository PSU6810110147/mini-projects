import { useParams, Link } from "react-router-dom";
import { movies } from "../data/movies";
import logo from "../assets/logo.png";

export default function MovieDetail() {
  const { id } = useParams();
  const m = movies.find((x) => String(x.id) === id);

  if (!m) {
    return (
      <main className="container" style={{ paddingTop: 24 }}>
        <p>Not found</p>
        <Link to="/home">กลับหน้าแรก</Link>
      </main>
    );
  }

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
        <Link to="/home" style={{ color: "rgba(255,255,255,.8)", fontWeight: 900 }}>
          ← กลับ
        </Link>

        <div className="detailGrid">
          <div className="detailPoster">
            <img src={m.poster} alt={m.title} />
          </div>

          <div>
            <h1 style={{ marginTop: 0 }}>{m.title}</h1>
            <p style={{ color: "rgba(255,255,255,.7)", fontWeight: 800 }}>
              {m.year} • {m.category} • {m.genre} • ⭐ {m.rating}
            </p>
            <p style={{ color: "rgba(255,255,255,.75)", lineHeight: 1.7 }}>
              {m.desc}
            </p>

            <button className="btn">▶ ดูตัวอย่าง</button>
          </div>
        </div>

        <div className="footer">© Mini-Project-Movie</div>
      </main>
    </>
  );
}

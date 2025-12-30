import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { movies, categories, rows } from "../data/movies";
import CarouselRow from "../components/CarouselRow";
import logo from "../assets/logo.png";

export default function Home() {
  const [cat, setCat] = useState("All");
  const nav = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const filtered = useMemo(() => {
    return cat === "All" ? movies : movies.filter((m) => m.category === cat);
  }, [cat]);

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

          {isLoggedIn ? (
            <button
              className="btnGhost"
              onClick={() => {
                localStorage.removeItem("token");
                nav("/login", { replace: true });
              }}
            >
              ออกจากระบบ
            </button>
          ) : (
            <button className="btn" onClick={() => nav("/login")}>เข้าสู่ระบบ</button>
          )}
        </div>
      </header>

      <main className="container" style={{ paddingTop: 16 }}>
        <h1 style={{ margin: "10px 0 6px" }}>Home (Movies)</h1>
        <p style={{ margin: 0, color: "rgba(255,255,255,.65)", fontWeight: 800 }}>
          มีหมวดหมู่ + carousel + โปสเตอร์ + หน้า detail
        </p>

        <div className="tabs">
          {categories.map((c) => (
            <button
              key={c}
              className={`tab ${cat === c ? "tabActive" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {rows.map((r) => (
          <CarouselRow
            key={r.key}
            title={r.title}
            items={filtered.filter(r.filter)}
          />
        ))}

        <div className="footer">© Mini-Project-Movie</div>
      </main>
    </>
  );
}

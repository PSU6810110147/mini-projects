import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movies } from "../data/movies";
import Carousel from "../components/Carousel";

export default function Home({ mode }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("All");

  // ================= รายการทั่วไป =================
  const filtered = useMemo(() => {
    let list = [...movies];

    if (tab !== "All") {
      list = list.filter((m) => m.type === tab);
    }

    if (mode === "home") {
      list = list.slice(0, 10);
    }

    return list;
  }, [tab, mode]);

  // ================= Trending (⭐ > 8.5) =================
  const trending = useMemo(() => {
    let list = [...movies];

    if (tab !== "All") {
      list = list.filter((m) => m.type === tab);
    }

    list = list.filter((m) => m.rating > 8.5);
    list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [tab]);

  return (
    <main className="container">
      {/* ================= HERO ================= */}
      <div className="heroCard">
        <h1>Home (Movies)</h1>
        <p className="muted">
          มีหมวดหมู่ + carousel + โปสเตอร์เท่ากัน + หน้า detail
        </p>

        <div className="tabs">
          {["All", "Movies", "Series"].map((t) => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}

          {/* 👉 ไปหน้าทั้งหมด */}
          <button className="ghostBtn" onClick={() => navigate("/movies")}>
            ไปหน้าทั้งหมด →
          </button>
        </div>
      </div>

      {/* ================= TRENDING ================= */}
      {trending.length > 0 && (
        <section className="section">
          <h2 className="sectionTitle">แนะนำ / Trending</h2>
          <Carousel items={trending} />
        </section>
      )}

      {/* ================= LIST ================= */}
      <section className="section">
        <h2 className="sectionTitle">รายการ</h2>
        <p className="muted">คลิกที่การ์ดเพื่อดูรายละเอียด</p>
        <Carousel items={filtered} />
      </section>
    </main>
  );
}

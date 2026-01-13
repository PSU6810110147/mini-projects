import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movies } from "../data/movies";
import Carousel from "../components/Carousel";

export default function Home() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("All");

  const filtered = useMemo(() => {
    let list = [...movies];
    if (tab !== "All") list = list.filter((m) => m.type === tab);
    return list.slice(0, 10);
  }, [tab]);

  const trending = useMemo(() => {
    let list = [...movies];
    if (tab !== "All") list = list.filter((m) => m.type === tab);
    return list.filter((m) => m.rating >= 8.5).sort((a, b) => b.rating - a.rating);
  }, [tab]);

return (
  <main className="container">
    <div className="heroCard">
      <div className="heroTop">
        <div>
          <h1 className="heroTitle">Home (Movies)</h1>

          {/* ลบบรรทัดนี้ออก ถ้าไม่อยากให้แสดง */}
          {/* <p className="heroSubtitle muted">มีหมวดหมู่ + carousel + หน้า detail</p> */}

          <div className="tabs">
            {["All", "Movies", "Series"].map((t) => (
              <button
                key={t}
                className={`tab ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}

            <button className="tab ghost" onClick={() => navigate("/movies")}>
              👉 ไปหน้าหนังทั้งหมด →
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* ✅ แนะนำ/Trending แสดงเฉพาะตอน All */}
    {tab === "All" && (
      <section className="section">
        <div className="sectionHead">
          <h2 className="sectionTitle">แนะนำ / Trending</h2>
        </div>
        <Carousel items={trending} />
      </section>
    )}

    {/* ✅ ทุกแท็บมี “รายการล่าสุด” */}
    <section className="section">
      <div className="sectionHead">
        <h2 className="sectionTitle">รายการล่าสุด</h2>
      </div>
      <Carousel items={filtered} />
    </section>
  </main>
);
}

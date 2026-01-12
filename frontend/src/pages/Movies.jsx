import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movies } from "../data/movies";

export default function Movies() {
  const [tab, setTab] = useState("All");
  const navigate = useNavigate();

  const list = useMemo(() => {
    if (tab === "All") return movies;
    return movies.filter((m) => m.type === tab);
  }, [tab]);

  return (
    <main className="container">
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">ทั้งหมด</h1>
          <p className="pageSub">คลิกการ์ดเพื่อเข้าหน้า Detail</p>
        </div>

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
        </div>
      </div>

      <section className="moviesGrid">
        {list.map((m) => (
          <article
            key={m.id}
            className="movieCard"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/movie/${m.id}`)}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/movie/${m.id}`)}
          >
            <div className="posterWrap">
              <img src={m.poster} alt={m.title} loading="lazy" />

              <div className="badgeLeft">{m.year}</div>
              <div className="badgeRight">⭐ {m.rating}</div>
            </div>

            <div className="movieInfo">
              <h3 className="movieTitle" title={m.title}>
                {m.title}
              </h3>
              <p className="movieMeta">
                {m.type} • {m.genre}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

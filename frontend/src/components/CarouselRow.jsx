import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CarouselRow({ title, items }) {
  const ref = useRef(null);
  const nav = useNavigate();

  const scrollByDir = (dir) => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.floor(el.clientWidth * 0.85);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="row">
      <div className="rowHead">
        <h2 style={{ margin: 0 }}>{title}</h2>
        <div className="rowBtns">
          <button className="iconBtn" onClick={() => scrollByDir(-1)}>‹</button>
          <button className="iconBtn" onClick={() => scrollByDir(1)}>›</button>
        </div>
      </div>

      <div className="rail" ref={ref}>
        {items.map((m) => (
          <article key={m.id} className="tile" onClick={() => nav(`/movies/${m.id}`)}>
            <div className="tilePoster">
              <img src={m.poster} alt={m.title} />
              <div className="tileBadges">
                <span className="badge">{m.year}</span>
                <span className="badge">⭐ {m.rating}</span>
              </div>
            </div>

            <div className="tileBody">
              <p className="tileTitle">{m.title}</p>
              <p className="tileMeta">{m.category} • {m.genre}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

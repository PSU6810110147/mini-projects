// src/components/Carousel.jsx
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Carousel({ title, items }) {
  const trackRef = useRef(null);
  const navigate = useNavigate();

  const slide = (dir) => {
    if (!trackRef.current) return;

    // เลื่อนตาม "ขนาดการ์ด" จริง (รวม gap)
    const first = trackRef.current.querySelector(".tile");
    const cardWidth = first ? first.getBoundingClientRect().width : 320;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap || "14") || 14;

    trackRef.current.scrollLeft += dir * (cardWidth + gap);
  };

  return (
    <section className="carousel">
      <div className="carousel-head">
        <h2>{title}</h2>
        <div className="carousel-actions">
          <button className="arrow" onClick={() => slide(-1)} aria-label="prev">
            ‹
          </button>
          <button className="arrow" onClick={() => slide(1)} aria-label="next">
            ›
          </button>
        </div>
      </div>

      <div className="carousel-track" ref={trackRef}>
        {items.map((m) => (
          <div
            className="tile"
            key={m.id}
            onClick={() => navigate(`/movie/${m.id}`)}
            role="button"
            tabIndex={0}
          >
            <div className="tilePoster">
              <img src={m.poster} alt={m.title} loading="lazy" />
              <div className="badge left">{m.year}</div>
              <div className="badge right">⭐ {m.rating}</div>
            </div>

            <div className="tileInfo">
              <h4 className="tileTitle">{m.title}</h4>
              <p className="tileMeta">
                {m.type} • {m.genre}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

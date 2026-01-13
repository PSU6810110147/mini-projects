// src/pages/MovieDetail.jsx (หรือ src/pages/Detail.jsx)
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movies } from "../data/movies";

function toYoutubeEmbed(url) {
  if (!url) return "";
  try {
    const u = new URL(url);

    // youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    // youtube.com/watch?v=VIDEO_ID
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      // เผื่อเป็น /embed/xxx อยู่แล้ว
      if (u.pathname.startsWith("/embed/")) return url;
    }

    return "";
  } catch {
    return "";
  }
}

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = useMemo(() => {
    const mid = Number(id); // สำคัญ: params เป็น string ต้องแปลงก่อน
    return movies.find((m) => m.id === mid);
  }, [id]);

  if (!movie) {
    return (
      <main className="container">
        <div className="heroCard">
          <h2>ไม่พบรายการนี้</h2>
          <button className="btn" onClick={() => navigate(-1)}>ย้อนกลับ</button>
        </div>
      </main>
    );
  }

  const embedUrl = toYoutubeEmbed(movie.trailerUrl);

  return (
    <main className="container">
      <div className="detailGrid">
        {/* ซ้าย: โปสเตอร์ + ข้อมูล */}
        <div className="detailLeft">
          <img className="detailPoster" src={movie.poster} alt={movie.title} />

          <h1>{movie.title}</h1>
          <p className="muted">
            {movie.year} • ⭐ {movie.rating} • {movie.type}
          </p>

          {/* ✅ คำอธิบาย */}
          {movie.overview ? (
            <p className="detailOverview">{movie.overview}</p>
          ) : (
            <p className="detailOverview muted">ยังไม่มีคำอธิบาย</p>
          )}

          <div className="detailActions">
            <button className="btn" onClick={() => navigate(-1)}>
              ย้อนกลับ
            </button>

            <button className="btn primary">
              เช่า
            </button>
          </div>
        </div>

        {/* ขวา: ตัวอย่างหนัง */}
        <div className="detailRight">
          <div className="trailerHeader">
            <h3 className="trailerTitle">ตัวอย่างหนัง</h3>
            {embedUrl && (
              <a className="btn" href={movie.trailerUrl} target="_blank" rel="noreferrer">
                เปิดใน YouTube
              </a>
            )}
          </div>

          <div className="trailerBox">
            {embedUrl ? (
              <iframe
                className="trailerFrame"
                src={embedUrl}
                title={`Trailer - ${movie.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div style={{ padding: 16 }} className="muted">
                ยังไม่มีลิงก์ตัวอย่างหนัง (trailerUrl)
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

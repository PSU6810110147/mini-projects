import { useNavigate, useParams } from "react-router-dom";
import { movies } from "../data/movies";

function toYoutubeEmbed(url) {
  if (!url) return "";
  try {
    const u = new URL(url);

    // youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      const videoId = u.pathname.replace("/", "");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }

    // youtube.com/watch?v=VIDEO_ID
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;

    return "";
  } catch {
    return "";
  }
}

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const m = movies.find((x) => String(x.id) === String(id));

  if (!m) {
    return (
      <div className="container">
        <h2>ไม่พบรายการ</h2>
        <button className="btn" onClick={() => navigate("/home")}>กลับหน้าแรก</button>
      </div>
    );
  }

  // ✅ รองรับทั้ง trailerUrl (ใน movies.js ของคุณ) และ trailer (เผื่อยังใช้ชื่อเก่า)
  const trailerUrl = m.trailerUrl || m.trailer || "";
  const trailerEmbed = toYoutubeEmbed(trailerUrl);

  return (
    <div className="container">
      <div className="detailGrid">
        {/* LEFT */}
        <div className="detailLeft">
          <img className="detailPoster" src={m.poster} alt={m.title} />
          <h1>{m.title}</h1>
          <p className="muted">
            {m.year} • ⭐ {m.rating} • {m.type} • {m.genre}
          </p>
          <p className="detailOverview">{m.overview}</p>

          <div className="detailActions">
            <button className="btn primary">เช่าหนัง</button>
            <button className="btn ghost" onClick={() => navigate(-1)}>ย้อนกลับ</button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="detailRight">
          <div className="trailerHeader">
            <h3 className="trailerTitle">ตัวอย่างหนัง</h3>

            {trailerUrl ? (
              <a
                className="btn ghost trailerBtn"
                href={trailerUrl}
                target="_blank"
                rel="noreferrer"
              >
                เปิดใน YouTube
              </a>
            ) : null}
          </div>

          {trailerEmbed ? (
            <div className="trailerBox">
              <iframe
                src={trailerEmbed}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="muted">ไม่มีตัวอย่างหนัง</p>
          )}
        </div>
      </div>
    </div>
  );
}

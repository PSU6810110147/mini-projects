import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movies } from "../data/movies";
import { useRentals } from "../contexts/RentalsContext";

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
      // already embed
      if (u.pathname.startsWith("/embed/")) return url;

      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;

      // shorts
      if (u.pathname.startsWith("/shorts/")) {
        const sid = u.pathname.split("/shorts/")[1]?.split("?")[0];
        return sid ? `https://www.youtube.com/embed/${sid}` : "";
      }
    }

    return url;
  } catch {
    // fallback simple replace
    return url.includes("watch?v=") ? url.replace("watch?v=", "embed/") : url;
  }
}

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rent, cancel, isRented } = useRentals();

  const movie = useMemo(() => movies.find((m) => String(m.id) === id), [id]);

  if (!movie) {
    return (
      <main className="container">
        <div className="glassCard">
          <h2 style={{ margin: 0 }}>ไม่พบข้อมูล</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            ไม่เจอหนังรหัส: {id}
          </p>
          <button type="button" className="btn big" onClick={() => navigate(-1)}>
            ⬅ ย้อนกลับ
          </button>
        </div>
      </main>
    );
  }

  const rented = isRented(movie.id);
  const trailerEmbed = toYoutubeEmbed(movie.trailerUrl);

  const handleRent = () => rent(movie.id);
  const handleCancel = () => cancel(movie.id);

  return (
    <main className="container">
      {/* mini header + logo */}
      <div className="detailTopBar">
        <div className="detailBrand" onClick={() => navigate("/home")} role="button" tabIndex={0}>
          <span className="detailBrandLogo" aria-hidden="true">🎬</span>
          <div className="detailBrandText">
            <div className="detailBrandTitle">Mini-Project-Movie</div>
            <div className="detailBrandSub muted">Movie detail</div>
          </div>
        </div>

        <button type="button" className="btn" onClick={() => navigate(-1)}>
          ⬅ ย้อนกลับ
        </button>
      </div>

      <div className="detailGrid">
        {/* LEFT */}
        <section className="detailLeft">
          <div className="detailPosterWrap">
            <img src={movie.poster} alt={movie.title} className="detailPoster" />
            {rented && <div className="detailRentedBadge">RENTED</div>}
          </div>

          <div className="detailInfoCard">
            <h1 className="detailTitle">{movie.title}</h1>

            {/* stats */}
            <div className="detailStats">
              <div className="stat">
                <div className="statLabel">Type</div>
                <div className="statValue">{movie.type}</div>
              </div>
              <div className="stat">
                <div className="statLabel">Year</div>
                <div className="statValue">{movie.year}</div>
              </div>
              <div className="stat">
                <div className="statLabel">Rating</div>
                <div className="statValue">⭐ {movie.rating}</div>
              </div>
            </div>

            {/* overview */}
            <div className="detailOverviewCard">
              <div className="detailSectionLabel">คำอธิบาย</div>
              <p className="detailOverview">
                {movie.overview || "ยังไม่มีคำอธิบาย"}
              </p>
            </div>

            {/* actions */}
            <div className="detailActionsBar">
              {!rented ? (
                <button
                  type="button"
                  className="btn primary big"
                  onClick={handleRent}
                >
                  🎬 เช่า
                </button>
              ) : (
                <button
                  type="button"
                  className="btn danger big"
                  onClick={handleCancel}
                >
                  ❌ ยกเลิกการเช่า
                </button>
              )}

              <button
                type="button"
                className="btn big"
                onClick={() => navigate("/library")}
              >
                📚 ไปคลังของฉัน
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT */}
        <section className="detailRight">
          <div className="detailTrailerHead">
            <h3 className="detailTrailerTitle">ตัวอย่างหนัง</h3>

            {movie.trailerUrl ? (
              <a
                className="btn trailerLinkBtn"
                href={movie.trailerUrl}
                target="_blank"
                rel="noreferrer"
              >
                เปิดบน YouTube ↗
              </a>
            ) : (
              <span className="muted" style={{ fontSize: 13 }}>
                ไม่มีลิงก์ตัวอย่าง
              </span>
            )}
          </div>

          <div className="trailerBox">
            {trailerEmbed ? (
              <iframe
                className="trailerFrame"
                src={`${trailerEmbed}?rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title="trailer"
              />
            ) : (
              <div className="trailerEmpty">
                <div className="trailerEmptyIcon">🎞️</div>
                <div className="trailerEmptyText">
                  ยังไม่มีตัวอย่างหนังสำหรับเรื่องนี้
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

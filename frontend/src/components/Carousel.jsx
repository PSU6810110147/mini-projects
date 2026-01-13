import { useNavigate } from "react-router-dom";
import { useRentals } from "../contexts/RentalsContext";

export default function Carousel({ items = [] }) {
  const navigate = useNavigate();
  const { isRented } = useRentals();

  if (!items.length) return null;

  return (
    <div className="carousel">
      <div className="carousel-track">
        {items.map((m) => {
          const rented = isRented(m.id);
          return (
            <div key={m.id} className="tile" onClick={() => navigate(`/movie/${m.id}`)}>
              <div className="tilePoster">
                <img src={m.poster} alt={m.title} />
                {rented && <div className="badge left">เช่าแล้ว ✅</div>}
              </div>
              <div className="tileInfo">
                <p className="tileTitle">{m.title}</p>
                <p className="tileMeta">
                  {m.year} • ⭐ {m.rating} • {m.type}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

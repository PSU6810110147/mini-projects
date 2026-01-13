import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (to) => pathname === to;

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="nav-left">
          <Link to="/home" className="brand-title">
            Mini-Project-Movie
          </Link>

          <div className="nav-center">
            <Link className={`nav-link ${isActive("/home") ? "active" : ""}`} to="/home">
              หน้าแรก
            </Link>
            <Link className={`nav-link ${isActive("/movies") ? "active" : ""}`} to="/movies">
              ทั้งหมด
            </Link>
            <Link className={`nav-link ${isActive("/library") ? "active" : ""}`} to="/library">
              คลังของฉัน
            </Link>
          </div>
        </div>

        <div className="nav-right">
          <button className="btn" onClick={onLogout}>
            ออกจากระบบ
          </button>
        </div>
      </div>
    </header>
  );
}

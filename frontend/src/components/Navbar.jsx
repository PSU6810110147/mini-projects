import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, user, role, logout } = useAuth();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="navbar">
      <div className="nav-inner">
        {/* Left / Brand */}
        <div className="nav-left" onClick={() => navigate("/home")}>
          {/* ถ้าคุณมีโลโก้จริง ให้เปลี่ยน src ได้ */}
          <img
            className="brand-logo"
            src="https://cdn-icons-png.flaticon.com/512/744/744922.png"
            alt="logo"
          />
          <div className="brand-title">Mini-Project-Movie</div>
        </div>

        {/* Center / Menu */}
        <div className="nav-center">
          <NavLink
            to="/home"
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
            หน้าแรก
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
            ทั้งหมด
          </NavLink>

          {/* library: เข้าทั้ง user + admin */}
          {isLoggedIn && (
            <NavLink
              to="/library"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              คลังของฉัน
            </NavLink>
          )}
        </div>

        {/* Right / User */}
        <div className="nav-right">
          {isLoggedIn ? (
            <>
              <span className="muted" style={{ fontSize: 13 }}>
                {user?.name ?? user?.username} •{" "}
                <b style={{ color: "white" }}>{role}</b>
              </span>
              <button className="btn" onClick={onLogout}>
                ออกจากระบบ
              </button>
            </>
          ) : (
            <button className="btn primary" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

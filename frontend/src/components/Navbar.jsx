import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ ล้าง token/session
    localStorage.removeItem("token");

    // ✅ เด้งกลับไปหน้า login
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navLeft">
        <div className="logo">Mini-Project-Movie</div>

        <div className="navLinks">
          <NavLink to="/home" end className={({ isActive }) => (isActive ? "active" : "")}>
            หน้าแรก
          </NavLink>

          <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}>
            ทั้งหมด
          </NavLink>
        </div>
      </div>

      <div className="navRight">
        <button type="button" onClick={handleLogout}>
          ออกจากระบบ
        </button>
      </div>
    </nav>
  );
}

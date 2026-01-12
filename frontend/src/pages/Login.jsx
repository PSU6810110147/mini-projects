import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/home";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("token", "logged-in");
      navigate(from, { replace: true }); // ✅ กลับไปหน้าที่ตั้งใจ
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="loginPage">
      <form className="loginCard" onSubmit={handleSubmit}>
        <h2>เข้าสู่ระบบ</h2>

        {error && <p className="loginError">{error}</p>}

        <div className="loginField">
          <label>Username</label>
          <input
            type="text"
            placeholder="กรอกชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="loginField">
          <label>Password</label>
          <input
            type="password"
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="loginBtn">
          Login
        </button>

        <p className="loginHint">
          * ตัวอย่าง: <b>admin / 1234</b>
        </p>
      </form>
    </div>
  );
}

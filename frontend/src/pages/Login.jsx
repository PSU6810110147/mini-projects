import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const res = login(username.trim(), password);
    if (!res.ok) {
      setError(res.message);
      return;
    }

    navigate("/home", { replace: true });
  };

  return (
    <div className="loginPage">
      <form className="loginCard" onSubmit={onSubmit}>
        <h2>เข้าสู่ระบบ</h2>
        <p className="muted" style={{ marginTop: 6 }}>
          เลือกเข้าได้ทั้ง Admin และ User
        </p>

        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin หรือ user"
          autoComplete="username"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="1234"
          autoComplete="current-password"
        />

        {error && (
          <p style={{ marginTop: 10, color: "#ffb4b4", fontSize: 13 }}>
            {error}
          </p>
        )}

        <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
          <button className="btn primary big" type="submit">
            Login
          </button>

          <button
            className="btn big"
            type="button"
            onClick={() => {
              setUsername("user");
              setPassword("1234");
              setError("");
            }}
          >
            ใช้ User
          </button>

          <button
            className="btn big"
            type="button"
            onClick={() => {
              setUsername("admin");
              setPassword("1234");
              setError("");
            }}
          >
            ใช้ Admin
          </button>
        </div>

        <p className="demoHint">
          ตัวอย่าง: <b>admin / 1234</b> (admin) หรือ <b>user / 1234</b> (user)
        </p>
      </form>
    </div>
  );
}

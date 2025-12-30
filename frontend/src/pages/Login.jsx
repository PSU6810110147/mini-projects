import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const nav = useNavigate();
  const location = useLocation();

  const onSubmit = (e) => {
    e.preventDefault();

    // ✅ demo login (คุณจะต่อ backend ทีหลังก็ได้)
    if (email && password) {
      localStorage.setItem("token", "demo-token");
      const to = location.state?.from || "/home";
      nav(to, { replace: true });
    }
  };

  return (
    <div className="loginWrap">
      <div className="loginCard">
        <h1 className="loginTitle">
          <img src={logo} alt="Mini-Project-Movie" style={{ width: 28, height: 28, objectFit: "contain" }} />
          Login
        </h1>
        <p className="loginSub">Sign in to continue</p>

        <form onSubmit={onSubmit}>
          <label className="fieldLabel">Email</label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <label className="fieldLabel">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button className="loginBtn" type="submit">Sign in</button>
        </form>

        <div className="demoText">Demo: test@example.com / 123456</div>
      </div>
    </div>
  );
}

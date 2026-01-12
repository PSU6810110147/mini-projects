import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Detail from "./pages/Detail"; // หรือ MovieDetail ก็ได้ แต่เลือกอันที่คุณใช้จริง

export default function App() {
  return (
    <Routes>
      {/* ให้ "/" ไป login เสมอ */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* หน้า Login */}
      <Route path="/login" element={<Login />} />

      {/* ทุกหน้าหลังบ้านต้องผ่าน guard */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/movies"
          element={
            <>
              <Navbar />
              <Movies />
            </>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <>
              <Navbar />
              <Detail />
            </>
          }
        />
      </Route>

      {/* กันพิมพ์ path แปลก */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

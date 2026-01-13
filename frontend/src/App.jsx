import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Detail from "./pages/Detail";
import Library from "./pages/Library";
import Login from "./pages/Login";

import { RentalsProvider } from "./contexts/RentalsContext";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <RentalsProvider>
        <Navbar />

        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Protected */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <Detail />
              </ProtectedRoute>
            }
          />

          {/* ตัวอย่าง: library ให้เข้าทั้ง user และ admin */}
          <Route
            path="/library"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Library />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </RentalsProvider>
    </AuthProvider>
  );
}

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  // ถ้ากำหนด allowedRoles แล้ว role ไม่อยู่ในนั้น => กันเข้า
  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!allowedRoles.includes(role)) return <Navigate to="/home" replace />;
  }

  return children;
}

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Remember the page the user was trying to reach
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
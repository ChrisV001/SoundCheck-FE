import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireRole({ roles, children }) {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  const userRole = user?.role;
  const normalized = (userRole || "").replace(/^ROLE_/, "");
  const allow = roles.map((r) => r.replace(/^ROLE_/, "")).includes(normalized);

  return allow ? children : <Navigate to={"/403"} replace />;
}

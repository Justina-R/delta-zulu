import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // Validar si el token expiró (decodificando el payload)
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return <Navigate to="/login?expired=true" replace />;
      }
    } catch (e) {
      console.error("Error al decodificar token:", e);
    }
  }

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay roles definidos y el usuario no tiene el rol necesario, redirigir al home
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderizar las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;

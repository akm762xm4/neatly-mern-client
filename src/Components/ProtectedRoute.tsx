import { Navigate } from "react-router-dom";
import { useAuthStore } from "../app/authStore";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/auth" replace />;
  return children;
};

export default ProtectedRoute;

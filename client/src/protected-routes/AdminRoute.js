import { Navigate } from "react-router-dom";
import { useAdminAuth, useAuth } from "../custom-hooks/useAuth";

const AdminRoute = ({ Component }) => {
  const loginAuth = useAuth();
  const adminAuth = useAdminAuth();
  if (loginAuth) {
    if (adminAuth) {
      return <Component />;
    } else {
      return <Navigate to="/route-not-found" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;

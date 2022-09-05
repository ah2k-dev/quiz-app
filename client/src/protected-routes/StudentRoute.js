import { Navigate } from "react-router-dom";
import { useStudentAuth, useAuth } from "../custom-hooks/useAuth";

const AdminRoute = ({ Component }) => {
  const loginAuth = useAuth();
  const studentAuth = useStudentAuth();
  if (loginAuth) {
    if (studentAuth) {
      return <Component />;
    } else {
      return <Navigate to="/route-not-found" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;

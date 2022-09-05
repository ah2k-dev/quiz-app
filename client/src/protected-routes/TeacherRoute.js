import { Navigate } from "react-router-dom";
import { useTeacherAuth, useAuth } from "../custom-hooks/useAuth";

const AdminRoute = ({ Component }) => {
  const loginAuth = useAuth();
  const teacherAuth = useTeacherAuth();
  if (loginAuth) {
    if (teacherAuth) {
      return <Component />;
    } else {
      return <Navigate to="/route-not-found" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;

import { useSelector } from "react-redux";

export const useAuth = () => {
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  if (isAuthenticated === true) {
    return true;
  } else {
    return false;
  }
};

export const useAdminAuth = () => {
  const { userData } = useSelector((state) => state.userReducer);
  const auth = useAuth();
  if (auth) {
    if (userData.role === "admin") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const useTeacherAuth = () => {
  const { userData } = useSelector((state) => state.userReducer);
  const auth = useAuth();
  if (auth) {
    if (userData.role === "teacher") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const useStudentAuth = () => {
  const auth = useAuth();
  const { userData } = useSelector((state) => state.userReducer);
  if (auth) {
    if (userData.role === "student") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

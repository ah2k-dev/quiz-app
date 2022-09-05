import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { LogoutOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Icon from "@ant-design/icons";

//default pages
import Home from "./components/Home";
import Login from "./components/Login.js";

//protected routes
import AdminRoute from "./protected-routes/AdminRoute";
import StudentRoute from "./protected-routes/StudentRoute";
import TeacherRoute from "./protected-routes/TeacherRoute";

//dashboards
import AdminDashboard from "./components/Dashboards/AdminDashboard.js";
import StudentDashboard from "./components/Dashboards/StudentDashboard.js";
import TeacherDashboard from "./components/Dashboards/TeacherDashboard.js";

//not authenticated route
import NotAuthenticatedRoute from "./protected-routes/NotAuthenticatedRoutes.js";

//admin pages
import AddTeacher from "./components/Admin-Pages/AddTeacher.js";
import ViewTeachers from "./components/Admin-Pages/ViewTeachers.js";
import ViewStudents from "./components/Admin-Pages/ViewStudents.js";
import ViewQuizes from "./components/Admin-Pages/ViewQuizes.js";
import ViewCourses from "./components/Admin-Pages/ViewCourses.js";
import ViewQuiz from "./components/Admin-Pages/ViewQuiz.js";
import ViewQuizResults from "./components/Admin-Pages/ViewQuizResults.js";
import ViewStdResults from "./components/Admin-Pages/ViewStdResults.js"; //used by teacher to view results

//teacher pages
import AddCourse from "./components/Teacher-Pages/AddCourse.js";
import AddStudent from "./components/Teacher-Pages/AddStudent.js";
import AddQuiz from "./components/Teacher-Pages/AddQuiz.js";
import EnrollStudents from "./components/Teacher-Pages/EnrollStudents.js";
import ViewTeacherCourses from "./components/Teacher-Pages/ViewTeacherCourses.js";
import ViewTeacherQuizes from "./components/Teacher-Pages/ViewTeacherQuizes.js"; //w.r.t courses

//student pages
import ViewStudentCourses from "./components/Student-Pages/ViewStudentCourses.js";
import AttemptQuiz from "./components/Student-Pages/AttemptQuiz.js";
import ViewStudentResult from "./components/Student-Pages/ViewStudentResult.js";
import ViewCourseQuizes from "./components/Student-Pages/ViewCourseQuizes";
import ViewSubmission from "./components/Student-Pages/ViewSubmission.js";

import { logout, presistLogin } from "./actions/userActions";
import { Button } from "antd";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(presistLogin(token));
    }
  }, [dispatch]);
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  return (
    <div className="App">
      <Router>
        <div className="ant-layout-header Header">
          <div className="ant-row ant-row-middle">
            <span className="ant-col-md-22">
              <h2
                className="ant-typography"
                style={{
                  marginTop: "5px",
                }}
              >
                Quiz Application
              </h2>
            </span>
            {isAuthenticated && (
              <Button
                className="and-col-md-2"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "none",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <LogoutOutlined
                  style={{
                    fontSize: "30px",
                  }}
                />
              </Button>
            )}
          </div>
        </div>
        <div className="ant-layout-content Content">
          <Routes>
            {/* default routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Admin routes */}
            <Route
              path="/admin-dashboard"
              element={<AdminRoute Component={AdminDashboard} />}
            />
            <Route
              path="/admin/add-teacher"
              element={<AdminRoute Component={AddTeacher} />}
            />
            <Route
              path="/admin/view-teachers"
              element={<AdminRoute Component={ViewTeachers} />}
            />
            <Route
              path="/admin/view-students"
              element={<AdminRoute Component={ViewStudents} />}
            />
            <Route
              path="/admin/view-quizes"
              element={<AdminRoute Component={ViewQuizes} />}
            />
            <Route
              path="/admin/view-quiz/:id"
              element={<AdminRoute Component={ViewQuiz} />}
            />
            <Route
              path="/admin/view-courses"
              element={<AdminRoute Component={ViewCourses} />}
            />
            <Route
              path="/admin/view-quiz-result/:id"
              element={<AdminRoute Component={ViewQuizResults} />}
            />
            <Route
              path="/admin/view-student-result/:id"
              element={<AdminRoute Component={ViewStdResults} />}
            />
            <Route
              path="/admin/view-submission/:id"
              element={<AdminRoute Component={ViewSubmission} />}
            />

            {/* Teacher routes */}

            <Route
              path="/teacher-dashboard"
              element={<TeacherRoute Component={TeacherDashboard} />}
            />

            <Route
              path="/teacher/add-course"
              element={<TeacherRoute Component={AddCourse} />}
            />
            <Route
              path="/teacher/add-student"
              element={<TeacherRoute Component={AddStudent} />}
            />
            <Route
              path="/teacher/add-quiz"
              element={<TeacherRoute Component={AddQuiz} />}
            />
            <Route
              path="/teacher/enroll-students"
              element={<TeacherRoute Component={EnrollStudents} />}
            />
            <Route
              path="/teacher/view-teacher-courses"
              element={<TeacherRoute Component={ViewTeacherCourses} />}
            />
            <Route
              path="/teacher/view-course-quizes/:id"
              element={<TeacherRoute Component={ViewTeacherQuizes} />}
            />
            <Route
              path="/teacher/view-quiz/:id"
              element={<TeacherRoute Component={ViewQuiz} />}
            />
            <Route
              path="/teacher/view-quiz-result/:id"
              element={<TeacherRoute Component={ViewQuizResults} />}
            />
            <Route
              path="/teacher/view-submission/:id"
              element={<TeacherRoute Component={ViewSubmission} />}
            />
            {/* student routes */}
            <Route
              path="/student-dashboard"
              element={<StudentRoute Component={StudentDashboard} />}
            />
            <Route
              path="/student/view-student-courses"
              element={<StudentRoute Component={ViewStudentCourses} />}
            />
            <Route
              path="/student/view-course-quizes/:id"
              element={<StudentRoute Component={ViewCourseQuizes} />}
            />
            <Route
              path="/student/attempt-quiz/:id"
              element={<StudentRoute Component={AttemptQuiz} />}
            />
            <Route
              path="/student/view-student-result"
              element={<StudentRoute Component={ViewStudentResult} />}
            />
            <Route
              path="/student/view-submission/:id"
              element={<StudentRoute Component={ViewSubmission} />}
            />

            <Route
              path="/route-not-found"
              element={<NotAuthenticatedRoute />}
            />
            <Route path="**" element={<NotAuthenticatedRoute />} />
          </Routes>
        </div>

        <div className="ant-layout-footer Footer">
          <h4 style={{ float: "right" }}>Copyrights reserved</h4>
        </div>
      </Router>
    </div>
  );
}

export default App;

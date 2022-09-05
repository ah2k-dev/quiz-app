import React from "react";
import { Typography } from "antd";
import DashboadButton from "./DashboadButton";
const TeacherDashboard = () => {
  const { Title } = Typography;

  const paths = [
    { title: "Add Student", path: "/teacher/add-student" },
    { title: "Add Course", path: "/teacher/add-course" },
    { title: "Add Quiz", path: "/teacher/add-quiz" },
    { title: "Enroll Student", path: "/teacher/enroll-students" },
    { title: "Courses", path: "/teacher/view-teacher-courses" },
  ];
  return (
    <div className="container" style={{ padding: "4vw", textAlign: "center" }}>
      <Title style={{ color: "black" }}>Teacher Dashboard</Title>
      <div
        className="ant-row ant-row-center"
        style={{ rowGap: "20px", columnGap: "15px", paddingTop: "2vw" }}
      >
        {paths.map((val, ind) => {
          return <DashboadButton title={val.title} path={val.path} key={ind} />;
        })}
      </div>
    </div>
  );
};

export default TeacherDashboard;

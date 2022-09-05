import React from "react";
import DashboadButton from "./DashboadButton";
import { Typography } from "antd";
const StudentDashboard = () => {
  const { Title } = Typography;
  const paths = [
    { title: "Enrolled Courses", path: "/student/view-student-courses" },
    { title: "Results", path: "/student/view-student-result" },
  ];
  return (
    <div className="container" style={{ padding: "4vw", textAlign: "center" }}>
      <Title style={{ color: "black" }}>Student Dashboard</Title>
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

export default StudentDashboard;

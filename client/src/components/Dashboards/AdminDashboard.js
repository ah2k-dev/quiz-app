import React from "react";
import { Typography } from "antd";
import DashboadButton from "./DashboadButton";
const AdminDashboard = () => {
  const { Title } = Typography;
  const paths = [
    { title: "Add Teacher", path: "/admin/add-teacher" },
    { title: "View Teachers", path: "/admin/view-teachers" },
    { title: "View Students", path: "/admin/view-students" },
    { title: "View Courses", path: "/admin/view-courses" },
    { title: "View Quizes", path: "/admin/view-quizes" },
  ];
  return (
    <div className="container" style={{ padding: "4vw", textAlign: "center" }}>
      <Title style={{ color: "black" }}>Admin Dashboard</Title>
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

export default AdminDashboard;

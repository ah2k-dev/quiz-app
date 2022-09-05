import React from "react";
import { Typography } from "antd";
const NotAuthenticatedRoutes = () => {
  const { Title } = Typography;
  return (
    <div
      className="container"
      style={{
        paddingTop: "15vh",
        textAlign: "center",
      }}
    >
      <Title>404 NOT FOUND</Title>
    </div>
  );
};

export default NotAuthenticatedRoutes;

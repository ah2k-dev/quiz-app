import React from "react";
import { Button } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      style={{
        position: "absolute",
        top: "20px",
        left: "5px",
        borderRadius: "10px",
      }}
      onClick={() => navigate("/teacher-dashboard")}
    >
      <RollbackOutlined />
    </Button>
  );
};

export default BackButton;

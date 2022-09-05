import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const DashboadButton = (props) => {
  const navigate = useNavigate();
  return (
    <Button
      className="ant-col-md-5"
      style={{ padding: "5vh", paddingBottom: "8vh" }}
      onClick={() => {
        navigate(props.path);
      }}
    >
      {props.title}
    </Button>
  );
};

export default DashboadButton;

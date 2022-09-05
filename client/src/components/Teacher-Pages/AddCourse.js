import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Input, Typography, message, Spin } from "antd";
import { addCourse, clearErrors } from "../../actions/teacherActions";
import BackButton from "./BackButton";
const AddCourse = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.userReducer.userData.user);
  const { loading, error } = useSelector((state) => state.teacherReducer);
  const onFinish = (values) => {
    dispatch(addCourse(values, _id));
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Failed:", errorInfo);
  };
  useEffect(() => {
    if (error) {
      message.error(error.message);
      dispatch(clearErrors);
    }
  }, [error, dispatch]);

  return loading ? (
    <div className="loading">
      <Spin size="large" />
    </div>
  ) : (
    <div
      className="container"
      style={{
        paddingTop: "20vh",
        textAlign: "center",
      }}
    >
      <BackButton />
      <Title style={{ color: "black" }}>Add Course</Title>
      <Form
        name="add-course"
        className="ant-row ant-row-center"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="ant-col-8"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Name" type="text" />
        </Form.Item>
        <div style={{ width: "100%" }}></div>
        <Form.Item
          className="ant-col-6"
          name="creditHrs"
          rules={[
            { required: true, message: "Please input your credit hours!" },
          ]}
        >
          <Input placeholder="Credit Hours" type="number" />
        </Form.Item>
        <div style={{ width: "100%" }}></div>
        <Form.Item className="ant-col-2">
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCourse;

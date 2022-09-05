import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Input, Typography, Select, message, Spin } from "antd";
import { addStudent, clearErrors } from "../../actions/teacherActions";
import BackButton from "./BackButton";

const AddStudent = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.userReducer.userData.user);
  const { loading, error } = useSelector((state) => state.teacherReducer);
  const onFinish = (values) => {
    dispatch(addStudent(values, _id));
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
        paddingTop: "15vh",
        textAlign: "center",
      }}
    >
      <BackButton />
      <Title style={{ color: "black" }}>Add Student</Title>
      <Form
        name="add-student"
        className="ant-row ant-row-center"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="ant-col-8"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input placeholder="Name" type="text" />
        </Form.Item>
        <div style={{ width: "100%" }}></div>
        <Form.Item
          className="ant-col-8"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input placeholder="Email" type="email" />
        </Form.Item>
        <div style={{ width: "100%" }}></div>
        <Form.Item
          className="ant-col-8"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <div style={{ width: "100%" }}></div>
        <Form.Item className="ant-col-2">
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStudent;

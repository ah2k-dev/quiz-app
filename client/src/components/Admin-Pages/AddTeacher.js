import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Input, Typography, Select, message, Spin } from "antd";
import { addTeacher, clearErrors } from "../../actions/adminActions";
import BackButton from "./BackButton";

const AddTeacher = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.adminReducer);
  const onFinish = (values) => {
    dispatch(addTeacher(values));
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Failed:", errorInfo);
  };
  useEffect(() => {
    if (error) {
      message.error(error.message);
      dispatch(clearErrors());
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
      <Title style={{ color: "black" }}>Add Teacher</Title>
      <Form
        name="add-teacher"
        className="ant-row ant-row-center"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="ant-col-12"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Name" type="text" />
        </Form.Item>
        <div style={{ width: "100%" }}></div>
        <Form.Item
          className="ant-col-12"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" type="email" />
        </Form.Item>
        <div style={{ width: "100%" }}></div>
        <Form.Item
          className="ant-col-12"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <div style={{ width: "100%" }}></div>
        <Form.Item
          className="ant-col-8"
          rules={[{ required: true, message: "Please select role" }]}
          name="qualification"
        >
          <Select placeholder="Select Qualification">
            <Select.Option value="bachelor">Bachelor</Select.Option>
            <Select.Option value="masters">Master</Select.Option>
            <Select.Option value="doctorate">Doctorate</Select.Option>
          </Select>
        </Form.Item>
        <div style={{ width: "100%" }}></div>
        <Form.Item className="ant-col-8">
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTeacher;

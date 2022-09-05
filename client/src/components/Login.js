import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, login } from "../actions/userActions";
import { Form, Button, Input, Typography, Select, message, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
const Login = () => {
  const { Title } = Typography;
  const { isAuthenticated, userData, loading, error } = useSelector(
    (state) => state.userReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(login(values));
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Failed:", errorInfo);
  };
  useEffect(() => {
    if (isAuthenticated) {
      message.success("Logged in");
    }
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, error, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isAuthenticated === true) {
      if (!token) {
        localStorage.setItem("token", userData.token);
      }
      if (userData.role === "admin") {
        const timer = setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000);
        return () => clearTimeout(timer);
      }
      if (userData.role === "student") {
        const timer = setTimeout(() => {
          navigate("/student-dashboard");
        }, 1000);
        return () => clearTimeout(timer);
      }
      if (userData.role === "teacher") {
        const timer = setTimeout(() => {
          navigate("/teacher-dashboard");
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, userData, navigate]);

  return loading ? (
    <div className="loading">
      <Spin size="large" />
    </div>
  ) : (
    <div
      className="container"
      style={{
        textAlign: "center",
        paddingTop: "25vh",
      }}
    >
      <Title level={2}>Login</Title>
      <Form
        name="login"
        className="ant-row ant-row-center"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          className="ant-col-10"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="login-form-icon" />}
            placeholder="Email"
            type="email"
          />
        </Form.Item>
        <div style={{ width: "100%" }}></div>
        <Form.Item
          className="ant-col-10"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input
            type="password"
            prefix={<UserOutlined className="login-form-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <div style={{ width: "100%" }}></div>

        <Form.Item
          className="ant-col-8"
          rules={[{ required: true, message: "Please select role" }]}
          name="role"
        >
          <Select placeholder="Select user role">
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="teacher">Teacher</Select.Option>
            <Select.Option value="student">Student</Select.Option>
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

export default Login;

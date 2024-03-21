import React, { useState } from "react";
import { Card, Form, Input, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Renders a login form component.
 *
 * @component
 * @example
 * return (
 *   <Login />
 * )
 */
const Login = () => {
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (login(password)) {
      navigate("/student-management");
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <Row justify="center" align="middle" style = {{backgroundColor: "white", marginTop: 10}}>
        <Card title="Login" bordered={true} className="login-card">
          <Form onFinish={handleSubmit} className="login-form">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
    </Row>
  );
};

export default Login;

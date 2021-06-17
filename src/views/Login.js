import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Card } from "antd";
import { login as loginAction } from "../redux/actions/authActions";

const Login = ({ auth, login }) => {
  const { isLoading } = auth;

  const onFinish = (values) => login(values);

  return (
    <Card title="Login" className="auth-card" hoverable>
      <Form layout="vertical" onFinish={onFinish} hideRequiredMark>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={isLoading}
            disabled={isLoading}
            htmlType="submit"
            block
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
const mapState = ({ auth }) => ({
  auth,
});
export default connect(mapState, { login: loginAction })(Login);

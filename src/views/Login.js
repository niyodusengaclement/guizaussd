import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../redux/actions/authActions";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading } = props.auth;

  const login = (e) => {
    e.preventDefault();
    if (!username || !password)
      return toast.error("Email and Password are required");
    props.login({ username, password });
  };
  return (
    <Row>
      <Col></Col>
      <Col size="sm">
        <Form className="pt-5" onSubmit={login}>
          <h3>Log in</h3>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            onClick={login}
            className="btn btn-dark btn-lg btn-block"
          >
            Sign in
            {isLoading && <Spinner animation="border" />}
            {!isLoading && ""}
          </Button>
          <p className="text-right">
            New Account? <Link to="/register">Register</Link>
          </p>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};
const mapState = ({ auth }) => ({
  auth,
});
export default connect(mapState, { login })(Login);

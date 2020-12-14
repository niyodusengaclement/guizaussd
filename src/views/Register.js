import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = (props) => {
  console.log(props);

  return (
    <Row>
      <Col></Col>
      <Col size="sm">
        <Form className="pt-5">
          <h3>Register</h3>

          <Form.Group>
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="full_name"
              className="form-control"
              placeholder="Enter Fullname"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </Form.Group>

          <Button type="submit" className="btn btn-dark btn-lg btn-block">
            Sign up
          </Button>
          <p className="text-right">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};
export default Register;

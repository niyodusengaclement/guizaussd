import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand to="#home">Guiza</Navbar.Brand>
      <Nav className="mr-auto">
        {/* <Link to="/login" className="nav-link">
          Home
        </Link>
        <Link to="#features" className="nav-link">
          Menus
        </Link>
        <Link to="#pricing" className="nav-link">
          Access
        </Link> */}
      </Nav>
      <Form inline>
        <Button variant="outline-none">
          <Link to="#" onClick={logout} className="nav-link">
            Logout
          </Link>
        </Button>
      </Form>
    </Navbar>
  );
};
export default NavBar;

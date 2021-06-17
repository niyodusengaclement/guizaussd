import React from "react";
import { Layout, Menu } from "antd";
import { useHistory, useLocation } from "react-router-dom";

const { Header } = Layout;
const Navbar = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item onClick={() => history.push("/dashboard")} key="/dashboard">
          Dashboard
        </Menu.Item>
        <Menu.Item onClick={() => history.push("/apps")} key="/apps">
          Apps
        </Menu.Item>
      </Menu>
    </Header>
  );
};
export default Navbar;

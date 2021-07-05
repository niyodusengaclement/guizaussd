import React from "react";
import { Layout, Menu, Avatar } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import { getLoggedUserInfo } from "../../utils/helpers";

const { SubMenu } = Menu;
const { Header } = Layout;

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const user = getLoggedUserInfo();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  const handleOnIdle = () => {
    localStorage.setItem(
      "loggedout",
      JSON.stringify({
        message: "You are logged out due to the long time of inactivity",
        path: `${window.location.pathname}${window.location.search}`,
      })
    );
    logout();
  };

  useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
  });

  return (
    <Header className="gwiza--header">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
        className="gwiza--menu"
      >
        <Menu.Item onClick={() => history.push("/dashboard")} key="/dashboard">
          Dashboard
        </Menu.Item>
        <Menu.Item onClick={() => history.push("/apps")} key="/apps">
          Apps
        </Menu.Item>

        <SubMenu
          key="avatar"
          icon={<Avatar>{user?.full_name[0]}</Avatar>}
          title={user?.full_name}
          className="gwiza--user"
        >
          <Menu.Item key="avatar:1" onClick={() => logout()}>
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};

export default Navbar;

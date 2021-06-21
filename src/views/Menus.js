import React from "react";
import { Row } from "antd";
import Container from "../components/container";
import MenusTree from "../components/app/menus/menusTree";
import Menu from "../components/app/menus/menu";

const Menus = () => (
  <Container pageTitle="App Menus">
    <Row gutter={16}>
      <MenusTree />
      <Menu />
    </Row>
  </Container>
);
export default Menus;

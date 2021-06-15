import React from "react";
import { Card, Col, Row } from "antd";
import MenusComp from "../components/Menus/";
import Container from "../components/container";
import NewApp from "../components/app/newApp";
import MenusTree from "../components/app/menus/menusTree";
import Menu from "../components/app/menus/menu";

const Menus = () => (
  <Container pageTitle="App Menus">
    {/* <MenusComp /> */}
    <Row gutter={16}>
      <MenusTree />
      <Menu />
    </Row>
  </Container>
);
export default Menus;

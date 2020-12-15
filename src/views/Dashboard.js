import React, { useEffect } from "react";
import Menus from "../components/Menus/";
import NavBar from "../components/Navbar";
import authToken from "../utils/authToken";

const Dashboard = () => {
  useEffect(() => {
    if (!authToken.isLoggedIn()) return (window.location.href = "/login");
  }, []);
  return (
    <>
      <NavBar />
      <Menus />
    </>
  );
};
export default Dashboard;

import React from "react";
import { Outlet } from "react-router";
import Home from "../components/home";

const MainLayout = () => {
  return (
    <div>
      <Home />
      <Outlet />
    </div>
  );
};

export default MainLayout;

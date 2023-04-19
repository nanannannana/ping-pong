import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes: React.FC = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

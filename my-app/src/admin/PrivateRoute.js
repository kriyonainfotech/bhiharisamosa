// src/admin/PrivateRoute.js
import React from "react";
import AdminLogin from "./AdminLogin";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  // If the admin token doesn't exist, render the AdminLogin component on the same URL.
  return token ? children : <AdminLogin />;
};

export default PrivateRoute;

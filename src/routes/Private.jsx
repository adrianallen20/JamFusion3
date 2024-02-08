import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

// import PrivateLayout from "Layouts/Private";
import { AuthContext } from "../contexts/authContext";

function PrivateRoute() {
  const { user } = useContext(AuthContext);

  return user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;

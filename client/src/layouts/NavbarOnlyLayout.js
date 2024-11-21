import Navbar from "../components/Navbar";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthenticationStatus } from "@nhost/react";
import { CircularProgress } from "@mui/material";

const NavbarOnlyLayout = ({ nhost }) => {
  // Get authentication status
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const location = useLocation();

  // Show loading spinner while authentication status is being determined
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  // Redirect unauthenticated users to the home page
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If authenticated, render the Navbar and the Outlet for nested routes
  return (
    <>
      <Navbar nhost={nhost} />
      <Outlet />
    </>
  );
};

export default NavbarOnlyLayout;

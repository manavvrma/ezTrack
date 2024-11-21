// import React, { useCallback, useContext } from "react";
// import { Button } from "@mui/material";
// import Logo from "./Logo";
// import "./styles/navbar.css";
// import { useSignOut, useNhostClient } from "@nhost/react";
// import { useNavigate } from "react-router-dom";
// import GoogleIcon from "@mui/icons-material/Google";
// import { GoogleLogin, googleLogout } from "@moeindana/google-oauth";
// import { UserContext, UserUpdateContext } from "../UserContext";

// const Navbar = () => {
//   const user = useContext(UserContext);
//   const setUser = useContext(UserUpdateContext);

//   const navigate = useNavigate();
//   const { signOut } = useSignOut();
//   const nhost = useNhostClient();

//   // Function to handle user sign-out
//   const handleSignOut = useCallback(() => {
//     signOut();
//     navigate("/");
//     setUser(null); // Clear user context on sign out
//   }, [signOut, navigate, setUser]);

//   // Function to handle Google login using @moeindana/google-oauth
//   const handleGoogleLoginSuccess = useCallback(
//     (response) => {
//       console.log(response);
//       setUser(response); // Update user context with login response
//     },
//     [setUser]
//   );

//   const handleGoogleLoginError = useCallback(() => {
//     console.log("Login Failed");
//   }, []);

//   return (
//     <nav className="navbar">
//       <Logo name={true} />
//       {user ? (
//         <Button variant="outlined" color="warning" onClick={handleSignOut}>
//           Logout
//         </Button>
//       ) : (
//         <GoogleLogin
//           onSuccess={handleGoogleLoginSuccess}
//           onError={handleGoogleLoginError}
//           useOneTap
//         >
//           <Button variant="outlined" color="primary">
//             <GoogleIcon sx={{ mr: 1 }} />
//             Login with Google
//           </Button>
//         </GoogleLogin>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// import { Button } from "@mui/material";
// import Logo from "./Logo";
// import "./styles/navbar.css";
// import { useCallback } from "react";
// import { useSignOut } from "@nhost/react";
// import { useNavigate } from "react-router-dom";
// import { useAuthenticationStatus } from "@nhost/react";
// import GoogleIcon from "@mui/icons-material/Google";

// const Navbar = ({ nhost }) => {
//   const { isAuthenticated } = useAuthenticationStatus();

//   const navigate = useNavigate();
//   const { signOut } = useSignOut();

//   const logout = useCallback(() => {
//     signOut();
//     navigate("/");
//   }, [navigate]);

//   const handleGoogleSignIn = () => {
//     nhost.auth.signIn({
//       provider: "google",
//     });
//   };

//   return (
//     <nav className="navbar">
//       <Logo name={true} />
//       {isAuthenticated ? (
//         <Button variant="outlined" color="warning" onClick={logout}>
//           Logout
//         </Button>
//       ) : (
//         <Button variant="outlined" color="primary" onClick={handleGoogleSignIn}>
//           <GoogleIcon
//             sx={{
//               mr: 1,
//             }}
//           />{" "}
//           Login
//         </Button>
//       )}
//     </nav>
//   );
// };
// export default Navbar;

import React, { useContext, useCallback } from "react";
import { Button } from "@mui/material";
import Logo from "./Logo";
import "./styles/navbar.css";
import {
  useSignOut,
  useAuthenticationStatus,
  useNhostClient,
} from "@nhost/react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleLogin } from "@moeindana/google-oauth";
import { UserContext, UserUpdateContext } from "../UserContext";

const Navbar = () => {
  const user = useContext(UserContext);
  const setUser = useContext(UserUpdateContext);

  // Initialize nhost client
  const nhost = useNhostClient();

  // Use authentication status
  const { isAuthenticated } = useAuthenticationStatus();

  // Use navigation hook
  const navigate = useNavigate();

  // Sign out function
  const { signOut } = useSignOut();

  // Function to handle user sign-out
  const logout = useCallback(() => {
    signOut();
    navigate("/");
  }, [signOut, navigate]);

  // Function to handle Google sign-in
  const handleGoogleSignIn = useCallback(() => {
    if (nhost) {
      nhost.auth.signIn({ provider: "google" }).catch((error) => {
        console.error("Error during Google sign-in:", error);
      });
    } else {
      console.error("Nhost client is not initialized.");
    }
  }, [nhost]);

  return (
    <nav className="navbar">
      <Logo name={true} />
      {isAuthenticated ? (
        <Button variant="outlined" color="warning" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={handleGoogleSignIn}>
          <GoogleIcon sx={{ mr: 1 }} />
          Login
        </Button>
      )}
    </nav>
  );
};

export default Navbar;

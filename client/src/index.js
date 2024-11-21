import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@moeindana/google-oauth";
import { UserProvider } from "./UserContext"; // Import your UserProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <UserProvider>
        {" "}
        {/* Wrap your app with UserProvider */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);

// PWA
serviceWorkerRegistration.register();

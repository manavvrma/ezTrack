import React, { createContext, useState, useContext } from "react";

// Create contexts for user and updater function
export const UserContext = createContext();
export const UserUpdateContext = createContext();

// UserProvider component that provides user state and updater function
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={setUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};

// Custom hooks to use the contexts easily
export const useUser = () => useContext(UserContext);
export const useUserUpdate = () => useContext(UserUpdateContext);

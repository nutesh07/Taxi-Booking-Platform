import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("cabx_user")) || null
  );

  const login = (info) => {
    setUser(info);
    localStorage.setItem("cabx_user", JSON.stringify(info));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cabx_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

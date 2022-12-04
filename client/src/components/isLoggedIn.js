import React, { Component, useState, useCallback } from "react";
import { AuthContext } from "./components/context/auth-context";

export default function isLoggedIn() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const login = useCallback(() => {
    setisLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setisLoggedIn(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    />
  );
}
export default isLoggedIn;

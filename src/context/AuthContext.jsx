import React from "react";
import { useState, useEffect, useRef } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();
const AuthContextProvider = AuthContext.Provider;
const { REACT_APP_PASSWORD } = process.env;

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isUserLogged, setIsUserLogged] = useState(false);
  const runUniqueUseEffect = useRef(false);
  const signOut = () => {
    localStorage.removeItem("unlimited_hash");
    setIsUserLogged(false);
    navigate("/");
  };
  const signIn = () => {
    navigate("/login");
  };
  const loadToken = async () => {
    const token = localStorage.getItem("unlimited_hash");
    const validToken = await bcrypt.compareSync(REACT_APP_PASSWORD, token);
    setIsUserLogged(validToken);
    return validToken;
  };

  useEffect(() => {
    if (runUniqueUseEffect.current) {
      loadToken();
      runUniqueUseEffect.current = false;
    }
  }, []);
  /**
   * @param {String} string - endpoint del lugar de destino (ejemplo: "/login")
   * @retorn envía al usuario a la dirección del endpoint
   */
  const redirection = (string) => {
    navigate(`${string}`);
  };

  return (
    <AuthContextProvider
      value={{
        signOut,
        isUserLogged,
        redirection,
        loadToken,
        setIsUserLogged,
        signIn,
      }}
    >
      {children}
    </AuthContextProvider>
  );
}

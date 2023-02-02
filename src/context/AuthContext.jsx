import React from "react";
import { useState, useEffect, useRef } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
// 1 Creamos el contexto y exportamos para usar en el hook
export const AuthContext = React.createContext();
const AuthContextProvider = AuthContext.Provider;
const { REACT_APP_PASSWORD } = process.env;
// 2 Recuperamos el token del localStorage

// 3 Creamos un custom provider
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isUserLogged, setIsUserLogged] = useState(false);
  const runUniqueUseEffect = useRef(false);

  // const token = localStorage.getItem("unlimited_hash");
  // const validToken = bcrypt.compareSync(REACT_APP_PASSWORD, token);
  // setIsUserLogged(validToken);
  // Método que borra las credenciales del localStorage y del state
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
    console.log("token pillado");
    setIsUserLogged(validToken);
    return validToken;
  };

  useEffect(() => {
    if (runUniqueUseEffect.current) {
      console.log("buscando token");
      loadToken();
      //   setActiveModal(true);
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

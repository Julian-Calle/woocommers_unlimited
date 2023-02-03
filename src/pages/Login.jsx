import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [activeModal, setActiveModal] = useState(true);

  const navigate = useNavigate();
  const { setIsUserLogged, signOut } = useAuth();

  const { REACT_APP_PASSWORD } = process.env;
  const validatePass = (inputPass) => {
    if (inputPass === REACT_APP_PASSWORD) {
      const hashedPassword = bcrypt.hashSync(
        inputPass,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      localStorage.setItem("unlimited_hash", hashedPassword);
      setIsUserLogged(true);
      navigate("/");
    }
  };
  return (
    <div>
      <div>Login</div>
      <Modal
        active={activeModal}
        title={<h1>Contraseña</h1>}
        body={<LoginForm submitAction={validatePass} cancelAction={signOut} />}
        closeAction={() => setActiveModal(!activeModal)}
        btnName={"Aceptar"}
        btnAction={() => setActiveModal(!activeModal)}
        size="small"
        border={false}
      />
    </div>
  );
}

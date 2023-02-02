import React from "react";
import WorkShops from "./pages/WorkShops";
import { Route, Routes, NavLink } from "react-router-dom";
import "./unlimited.css";
import GeneralInfo from "./pages/GeneralInfo";
import { Subscribe } from "./pages/Subscribe";
import ButtonIcon from "./components/ButtonIcon";
import Login from "./pages/Login";
import AdminRoute from "./guards/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";
import ShowToAdmin from "./guards/ShowToAdmin";
import ShowTNotLogged from "./guards/ShowTNotLogged";
// import React, { useEffect, useState, useRef } from "react";

export default function Unlimited() {
  const { signOut, signIn } = useAuth();
  return (
    <div className="App">
      <div className="linksContainer">
        <ShowToAdmin>
          <NavLink className="links" exact="true" to="/">
            Talleres
          </NavLink>
          <NavLink exact="true" to="/details">
            General
          </NavLink>
          <NavLink exact="true" to="/suscribe">
            Inscribir
          </NavLink>
          {/* <NavLink exact="true" to="/login">
            login
          </NavLink> */}
          <ButtonIcon icon={"sign-out"} cls="icon" action={signOut} />
        </ShowToAdmin>
        <ShowTNotLogged>
          <ButtonIcon icon={"sign-in"} cls="icon" action={signIn} />
        </ShowTNotLogged>
      </div>
      <section className="main">
        <Routes>
          <Route element={<AdminRoute />}>
            <Route exact="true" path="/details" element={<GeneralInfo />} />
            <Route exact="true" path="/suscribe" element={<Subscribe />} />
          </Route>
          <Route exact="true" path="/" element={<WorkShops />} />
          {/* <Route exact="true" path="/details" element={<GeneralInfo />} /> */}
          <Route exact="true" path="/login" element={<Login />} />
        </Routes>
      </section>
    </div>
  );
}

import React from "react";
import WorkShops from "./pages/WorkShops";
import { Route, Routes, NavLink } from "react-router-dom";
import "./unlimited.css";
import GeneralInfo from "./pages/GeneralInfo";
import { Subscribe } from "./pages/Subscribe";
import ButtonIcon from "./components/ButtonIcon";
import Login from "./pages/Login";
import AdminRoute from "./guards/AdminRoute";
import useAuth from "./hooks/useAuth";
import ShowToAdmin from "./guards/ShowToAdmin";
import ShowTNotLogged from "./guards/ShowTNotLogged";
import footer from "./assets/UNL24LOGO.png";
import unlimitedLogo from "./assets/logo2.png";
import WorkShopsMap from "./pages/WorkShopsMap";
import Schedule from "./pages/Schedule";

export default function Unlimited() {
  const { signOut, signIn } = useAuth();
  return (
    <div className="App">
      <div className="linksContainer">
        <NavLink className="links" exact="true" to="/">
          Talleres
        </NavLink>
        <NavLink className="links" exact="true" to="/map">
          Mapa
        </NavLink>
        <NavLink className="links" exact="true" to="/schedule">
          Horario
        </NavLink>
        <ShowToAdmin>
          <NavLink exact="true" to="/details">
            General
          </NavLink>
          <NavLink exact="true" to="/suscribe">
            Inscribir
          </NavLink>
          <ButtonIcon icon={"sign-out"} cls="icon" action={signOut} />
        </ShowToAdmin>
        <ShowTNotLogged>
          <div>
            <img
              onClick={signIn}
              className="imgUmlimited"
              src={unlimitedLogo}
              alt="unlimitedLogo"
            />
          </div>
        </ShowTNotLogged>
      </div>
      <div className="footer">
        <img className="imgFooter" src={footer} alt={"logo"} />
      </div>
      <section className="main">
        <Routes>
          <Route element={<AdminRoute />}>
            <Route exact="true" path="/details" element={<GeneralInfo />} />
            <Route exact="true" path="/suscribe" element={<Subscribe />} />
          </Route>
          <Route exact="true" path="/" element={<WorkShops />} />
          <Route exact="true" path="/map" element={<WorkShopsMap />} />
          <Route exact="true" path="/Schedule" element={<Schedule />} />
          <Route exact="true" path="/login" element={<Login />} />
        </Routes>
      </section>
    </div>
  );
}

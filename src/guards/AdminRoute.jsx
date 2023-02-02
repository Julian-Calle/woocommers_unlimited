import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const { isUserLogged } = useAuth();
  return isUserLogged ? <Outlet /> : <Navigate replace to="/login" />;
}

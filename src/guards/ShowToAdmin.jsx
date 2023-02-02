import useAuth from "../hooks/useAuth";

export default function ShowToAdmin({ children }) {
  const { isUserLogged } = useAuth();

  return <>{isUserLogged ? children : null}</>;
}

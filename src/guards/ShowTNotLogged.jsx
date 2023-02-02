import useAuth from "../hooks/useAuth";

export default function ShowTNotLogged({ children }) {
  const { isUserLogged } = useAuth();

  return <>{!isUserLogged ? children : null}</>;
}

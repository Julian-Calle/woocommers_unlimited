import { generalContext } from "../context/GeneralContext";
import { useContext } from "react";

export default function useGeneralContext() {
  const contex = useContext(generalContext);
  return contex;
}

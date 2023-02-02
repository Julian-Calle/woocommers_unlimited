import React, { useState } from "react";
import { getDataFromTab } from "../utils/spreadSheetCalls";

export const generalContext = React.createContext();
const GeneralContextProvider = generalContext.Provider;

export function GeneralProvider({ children }) {
  //*******************************************************************************************************/
  //****************************************Router style Manager//****************************************/
  //*****************************************************************************************************/

  //In this section is the information to change headers styling after clic
  //in one on the differents options in differents headers

  //********************/
  //****Main header****/
  //******************/
  const basicColumnsInfo = [
    { field: "name", headerName: "Nombre", minWidth: 100, flex: 0.5 },
    { field: "surname", headerName: "Apellido", minWidth: 100, flex: 0.5 },
    { field: "block1", headerName: "Taller 1/3", minWidth: 130, flex: 1 },
    { field: "block2", headerName: "Taller 2/3", minWidth: 130, flex: 1 },
    { field: "block3", headerName: "Taller 3/3", minWidth: 130, flex: 1 },
  ];
  const fullColumnsInfo = [
    { field: "id", headerName: "ID", minWidth: 55, flex: 0.1 },
    ...basicColumnsInfo,
    { field: "email", headerName: "Email", minWidth: 100, flex: 0.5 },
    { field: "payment", headerName: "Pago", minWidth: 60, flex: 0.3 },
    { field: "fees", headerName: "Fees", minWidth: 60, flex: 0.3 },
    { field: "net", headerName: "Neto", minWidth: 60, flex: 0.3 },
    { field: "status", headerName: "Status", minWidth: 70, flex: 0.5 },
  ];

  //********************/
  //****   State   ****/
  //******************/
  const [orderList, setOrderList] = useState([]);

  const loadTable = async () => {
    const tab = "global";
    console.log("getDataFromTab");
    const spreadSheetRows = await getDataFromTab(tab);
    console.log({ spreadSheetRows });
    setOrderList(spreadSheetRows);
  };

  return (
    <GeneralContextProvider
      value={{
        basicColumnsInfo,
        fullColumnsInfo,
        orderList,
        setOrderList,
        loadTable,
      }}
    >
      {children}
    </GeneralContextProvider>
  );
}

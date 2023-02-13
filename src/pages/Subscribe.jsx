import React, { useState, useRef, useEffect } from "react";
import "../CSS/subscribe.css";
import { addDataToTab, getDataFromTab } from "../utils/spreadSheetCalls";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
import SubscriptionForm from "../components/SubscriptionForm";
const { REACT_APP_EXCEL } = process.env;

export function Subscribe() {
  const runUniqueUseEffect = useRef(true);
  const [workshopsOptions, setWorkshopsOptions] = useState({});
  const [loadState, setLoadState] = useState(true);

  const visitLink = () => {
    window.open(REACT_APP_EXCEL);
  };

  const getWorkshopList = async () => {
    const spreadsheetResponse = await getDataFromTab("options");

    const list = spreadsheetResponse.reduce(
      (acc, item) => {
        const count = Number(item.count);
        const limit = Number(item.limit);
        const block = {
          name: item.option,
          count,
          limit,
          available: count < limit,
        };
        acc[`block${item.block}`] = [...acc[`block${item.block}`], block];
        return acc;
      },
      {
        block1: [],
        block2: [],
        block3: [],
      }
    );
    setWorkshopsOptions(list);
    setLoadState(false);
  };
  const onSubmit = (data) => {
    addDataToTab(
      [
        {
          ...data,
          fees: "0",
          net: data.payment,
          status: "Done",
          type: "local",
          id: uuidv4()
            .replace(new RegExp(/[a-z,A-Z,0,-]/, "g"), "")
            .slice(-10),
        },
      ],
      "new"
    );
    setLoadState(true);
    setTimeout(async () => await getWorkshopList(), 2000);
  };

  useEffect(() => {
    if (runUniqueUseEffect.current) {
      getWorkshopList();
      runUniqueUseEffect.current = false;
    }
  }, []);
  const workshopColumns = [
    // { field: "id", headerName: "ID", minWidth: 55, flex: 0.1 },
    { field: "name", headerName: "Taller", minWidth: 360 },
    { field: "count", headerName: "Ins", minWidth: 10, width: 45 },
    { field: "limit", headerName: "Max", minWidth: 10, width: 45 },
  ];

  const blockOneRows = workshopsOptions?.block1?.map((option, index) => ({
    ...option,
    id: index,
  }));
  const blockTwoRows = workshopsOptions?.block2?.map((option, index) => ({
    ...option,
    id: index,
  }));
  const blockThreeRows = workshopsOptions?.block3?.map((option, index) => ({
    ...option,
    id: index,
  }));

  return (
    <section className="sectionContainer">
      {/* <h1 className="containerTittle">Inscribir</h1> */}
      <SubscriptionForm sendAction={onSubmit} options={workshopsOptions} />

      <button className="btn-38 " onClick={visitLink}>
        <span className="new"> Clic para ver DB </span>
        <div className="old">
          <span>DB</span>
          <span>DB</span>
        </div>
      </button>
      <section className="workshopListSection">
        <div className="dataGridWorkshop">
          <h2>BLOQUE 1</h2>
          <DataGrid
            rows={blockOneRows || []}
            columns={workshopColumns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            //   autoPageSize
            // columnBuffer={0}
            // disableExtendRowFullWidth={true}
            disableSelectionOnClick
            loading={loadState}
            // disableColumnMenu
            // onCellClick={(e) => test(e)}
            // checkboxSelection
            // className=".MuiDataGrid-cell--textLeft"
          />
        </div>
        <div className="dataGridWorkshop">
          <h2>BLOQUE 2</h2>
          <DataGrid
            rows={blockTwoRows || []}
            columns={workshopColumns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            //   autoPageSize
            // columnBuffer={0}
            // disableExtendRowFullWidth={true}
            disableSelectionOnClick
            loading={loadState}
            // disableColumnMenu
            // onCellClick={(e) => test(e)}
            // checkboxSelection
            // className=".MuiDataGrid-cell--textLeft"
          />
        </div>
        <div className="dataGridWorkshop">
          <h2>BLOQUE 3</h2>
          <DataGrid
            rows={blockThreeRows || []}
            columns={workshopColumns}
            //   pageSize={6}
            rowsPerPageOptions={[6]}
            //   autoPageSize
            // columnBuffer={0}
            // disableExtendRowFullWidth={true}
            disableSelectionOnClick
            loading={loadState}
            // disableColumnMenu
            // onCellClick={(e) => test(e)}
            // checkboxSelection
            // className=".MuiDataGrid-cell--textLeft"
          />
        </div>
      </section>
    </section>
  );
}

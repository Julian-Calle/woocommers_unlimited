import React, { useState, useRef, useEffect } from "react";
import "../CSS/subscribe.css";
import { addDataToTab, getDataFromTab } from "../utils/spreadSheetCalls";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
import SubscriptionForm from "../components/SubscriptionForm";

export function Subscribe() {
  const runUniqueUseEffect = useRef(true);
  const [workshopsOptions, setWorkshopsOptions] = useState({});
  const [loadState, setLoadState] = useState(true);

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
    console.log("cargoooooo las opciones");
    console.log({ list });
    console.log({ list1: list.block1 });
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
      <h1 className="containerTittle">Inscribir</h1>
      <SubscriptionForm sendAction={onSubmit} options={workshopsOptions} />
      {/* <form onSubmit={handleSubmit(onSubmit)} className="subscriptionForm">
        <section className="infoForm">
          <div className="inputContainer">
            <label htmlFor="name">Nombre</label>
            <input
              placeholder="    Nombre"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="formError">Nombre es obligatorio</span>
            )}
          </div>
          <div className="inputContainer">
            <label htmlFor="surname">Apellido</label>
            <input
              placeholder="    Apellido"
              {...register("surname", { required: true })}
            />
            {errors.surname && (
              <span className="formError">Apellido es obligatorio</span>
            )}
          </div>
          <div className="inputContainer">
            <label htmlFor="email">Correo</label>
            <input
              placeholder="    Correo"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="formError">Correo es obligatorio</span>
            )}
          </div>
          <div className="inputContainer">
            <label htmlFor="Cantidad">Cantidad</label>
            <select
              className="suscribeDynamicOptions"
              {...register("payment")}
              defaultValue="seleccionar"
            >
              <option value="null" disabled>
                Selecciona
              </option>
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
            {errors.payment && (
              <span className="formError">Cantidad es obligatorio</span>
            )}
          </div>
        </section>
        <section className="optionsForm">
          <div className="inputContainer">
            <label htmlFor="block1">Taller 1</label>
            <select
              className="suscribeDynamicOptions"
              {...register("block1")}
              defaultValue="seleccionar"
            >
              <option value="null" disabled>
                Selecciona
              </option>
              <option value="">Ninguno</option>
              <DynamicOptions options={workshopsOptions?.block1} />
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="block2">Taller 2</label>
            <select
              className="suscribeDynamicOptions"
              {...register("block2")}
              defaultValue="seleccionar"
            >
              <option value="null" disabled>
                Selecciona
              </option>
              <option value="">Ninguno</option>
              <DynamicOptions options={workshopsOptions?.block2} />
            </select>
          </div>
          <div className="inputContainer">
            <label htmlFor="block3">Taller 3</label>
            <select
              className="suscribeDynamicOptions"
              {...register("block3")}
              defaultValue="seleccionar"
            >
              <option value="null" disabled>
                Selecciona
              </option>
              <option value="">Ninguno</option>
              <DynamicOptions options={workshopsOptions?.block3} />
            </select>
          </div>
        </section>
        <button className="btn-38 ">
          <span className="new"> Clic para aceptar </span>
          <div className="old">
            <span>Añadir</span>
            <span>Añadir</span>
          </div>
        </button>
      </form> */}
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

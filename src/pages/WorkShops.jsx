import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";

// import { google } from "googleapis";
// import { GoogleSpreadSheet } from "google-spreadsheet";
import * as _ from "lodash";
// import credententials from "./../../credentials.json";

import "../CSS/workShops.css";
import useGeneralContext from "../hooks/useGeneralContext";

const test = (e) => {
  console.log(e);
};
export default function WorkShops() {
  const { basicColumnsInfo, orderList, setOrderList, loadTable } =
    useGeneralContext();
  const runUniqueUseEffect = useRef(true);
  // const [orderList, setOrderList] = useState([]);
  const [loadState, setLoadState] = useState(true);
  const {
    REACT_APP_WOO_PUBLIC,
    REACT_APP_WOO_SECRET,
    REACT_APP_BASE_URL,
    REACT_APP_CONECTION_ID,
  } = process.env;
  async function getProdcuts() {
    const URL =
      "https://unlimited.red/wp-json/wc/v3/orders?status[0]=processing&status[1]=completed&status[2]=on-hold&status[3]=completed";
    const pages = [1, 2];
    const LIMIT = 100;
    const ordersApiResult = await pages.reduce(async (acc, page) => {
      const pageOrders = await axios
        .get(`${URL}&page=${page}&per_page=${LIMIT}`, {
          auth: {
            username: REACT_APP_WOO_PUBLIC,
            password: REACT_APP_WOO_SECRET,
          },
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      return [...(await acc), ...pageOrders];
    }, []);

    const orders = ordersApiResult.map((order) => {
      const metaData = order.meta_data;
      const fee = metaData[5].value;
      const id = order.id;
      const status = order.status;
      const amount = order.total;
      const netAmount = amount - fee;
      const orderFirstName = order.billing.first_name;
      const orderLastName = order.billing.last_name;
      const orderEmail = order.billing.email;
      // const orderItems = order.line_items;
      const rawInfo = order.line_items[0].meta_data.slice(1);
      const info = rawInfo.reduce(
        (acc, options) => {
          const weirdWorkshopName =
            "Un encuentro para reflexionar (taller para lideres y pastores) PARTE 1 y 2";
          const day =
            options.key === "Día" ? options.value.split("(")[0] : null;
          const blockOne = options.key === "Taller 1/3" ? options.value : null;
          const blockTwo =
            blockOne === weirdWorkshopName
              ? weirdWorkshopName
              : options.key === "Taller 2/3"
              ? options.value
              : null;
          const blockThree =
            options.key === "Taller 3/3" ? options.value : null;
          return {
            ...acc,
            day: acc.day || day,
            blockOne: acc.blockOne || blockOne,
            blockTwo: acc.blockTwo || blockTwo,
            blockThree: acc.blockThree || blockThree,
          };
        },
        {
          day: null,
          blockOne: null,
          blockTwo: null,
          blockThree: null,
        }
      );
      return {
        id,
        status,
        amount,
        fee,
        netAmount,
        orderFirstName,
        orderLastName,
        orderEmail,
        info,
      };
    });
    setOrderList(orders);
    setLoadState(false);
  }

  // const rows = orderList.map((order) => ({
  //   id: order.id,
  //   firstName: _.capitalize(order.orderFirstName),
  //   lastName: _.capitalize(order.orderLastName),
  //   // email: order.orderEmail,
  //   blockOne: order.info.blockOne,
  //   blockTwo: order.info.blockTwo,
  //   blockThree: order.info.blockThree,
  // }));

  const getData = async () => {
    const url = `${REACT_APP_BASE_URL}${REACT_APP_CONECTION_ID}/tabs/input`;
    //https://sheet.best/api/sheets/835b6f3d-4d7d-4082-8264-cf3d19854f12/tabs/input
    const spreadSheet = await axios(url)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log({ spreadSheet });
  };
  const addData = async () => {
    const url = `${REACT_APP_BASE_URL}${REACT_APP_CONECTION_ID}/tabs/input`;

    const spreadSheet = await axios
      .post(url, {
        nombre: "react",
        edad: 2,
        taller: "test",
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log({ spreadSheet });
  };

  useEffect(() => {
    if (runUniqueUseEffect.current) {
      loadTable();
      setLoadState(false);

      runUniqueUseEffect.current = false;
    }
  }, []);
  return (
    <section className="sectionContainer">
      <h1 className="containerTittle">Lista de talleres</h1>
      <div className="dataGridContainer">
        <DataGrid
          rows={orderList}
          columns={basicColumnsInfo}
          // pageSize={3}
          rowsPerPageOptions={[100]}
          autoPageSize
          // columnBuffer={0}
          // disableExtendRowFullWidth={true}
          disableSelectionOnClick
          loading={loadState}
          disableColumnMenu
          onCellClick={(e) => test(e)}
          // checkboxSelection
          // className=".MuiDataGrid-cell--textLeft"
        />
      </div>
      {/* <div>{CollapsibleTable()}</div> */}
    </section>
  );
}

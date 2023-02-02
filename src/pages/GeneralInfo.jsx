import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as _ from "lodash";
import { addDataToTab, deleteAllDataFromTab } from "../utils/spreadSheetCalls";
import "../CSS/generalInfo.css";
import useGeneralContext from "../hooks/useGeneralContext";
export default function GeneralInfo() {
  const { fullColumnsInfo, orderList, loadTable } = useGeneralContext();
  const runUniqueUseEffect = useRef(true);
  const [loadState, setLoadState] = useState(true);
  const { REACT_APP_WOO_PUBLIC, REACT_APP_WOO_SECRET } = process.env;
  const saveOrders = async (orders, tab) => {
    await deleteAllDataFromTab(tab, "name");
    console.log({ orders, tab });
    const rowsForExcel = orders.map((order) => ({
      id: `${order.id}`,
      name: _.capitalize(order.orderFirstName),
      surname: _.capitalize(order.orderLastName),
      block1: order.info.blockOne,
      block2: order.info.blockTwo,
      block3: order.info.blockThree,
      email: order.orderEmail,
      payment: order.amount,
      fees: order.fee,
      status: order.status,
      net: order.net,
      type: "web",
    }));

    setTimeout(async () => {
      console.log("addDataToTab");
      await addDataToTab(rowsForExcel, tab);
    }, 2000);
  };
  async function getOrdersFromWowCommerce() {
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
      const net = amount - fee;
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
        net,
        orderFirstName,
        orderLastName,
        orderEmail,
        info,
      };
    });
    return orders;
  }

  const updateOrderWebList = async () => {
    setLoadState(true);
    const orders = await getOrdersFromWowCommerce();
    await saveOrders(orders, "web");
    setTimeout(async () => {
      await loadTable();
      setLoadState(false);
    }, 5000);
  };

  useEffect(() => {
    if (runUniqueUseEffect.current) {
      // getOrdersFromWowCommerce();
      loadTable();
      runUniqueUseEffect.current = false;
      setLoadState(false);
    }
  }, [orderList]);
  return (
    <section className="sectionContainer">
      <div className="TitleAndIcon">
        <h1 className="containerTittle">Información general</h1>
        <button
          className="btn-38 "
          onClick={async () => await updateOrderWebList()}
        >
          <span className="new"> Clic para actualizar </span>
          <div className="old">
            <span>Actualizar</span>
            <span>Actualizar</span>
          </div>
        </button>
      </div>
      <div className="dataGridContainer">
        <DataGrid
          rows={orderList}
          columns={fullColumnsInfo}
          // pageSize={3}
          rowsPerPageOptions={[100]}
          autoPageSize
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
  );
}

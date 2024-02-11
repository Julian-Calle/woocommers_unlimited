// import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as _ from "lodash";
import {
  addDataToTab,
  deleteAllDataFromTab,
  getDataFromTabWeb,
} from "../utils/spreadSheetCalls";
import "../CSS/generalInfo.css";
import useGeneralContext from "../hooks/useGeneralContext";
import BasicInfoModal from "../components/BasicInfoModal";
import Modal from "../components/Modal";
export default function GeneralInfo() {
  const showDetails = (e) => {
    setModalContent(e.row);
    setActiveModal(true);
  };
  const { fullColumnsInfo, orderList, loadTable } = useGeneralContext();
  const runUniqueUseEffect = useRef(true);
  const [loadState, setLoadState] = useState(true);
  const [activeModal, setActiveModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  // const { REACT_APP_WOO_PUBLIC, REACT_APP_WOO_SECRET } = process.env;
  const saveOrders = async (orders, tab) => {
    await deleteAllDataFromTab(tab, "name");
    const rowsForExcel = orders.map((order) => ({
      id: `${order.id}`,
      name: _.capitalize(order.name),
      surname: _.capitalize(order.surname),
      block1: order.block1,
      block2: order.block2,
      block3: order.block3,
      email: order.email,
      payment: 0,
      fees: 0,
      status: order.status,
      net: 0,
      type: "web",
    }));

    setTimeout(async () => {
      await addDataToTab(rowsForExcel, tab);
    }, 2000);
  };
  // async function getOrdersFromWowCommerce() {
  //   const URL =
  //     "https://unlimited.red/wp-json/wc/v3/orders?status[0]=processing&status[1]=completed&status[2]=on-hold&status[3]=completed";
  //   const pages = [1, 2];
  //   const LIMIT = 100;
  //   const ordersApiResult = await pages.reduce(async (acc, page) => {
  //     const pageOrders = await axios
  //       .get(`${URL}&page=${page}&per_page=${LIMIT}`, {
  //         auth: {
  //           username: REACT_APP_WOO_PUBLIC,
  //           password: REACT_APP_WOO_SECRET,
  //         },
  //       })
  //       .then(function (response) {
  //         return response.data;
  //       })
  //       .catch(function (error) {
  //         console.alert(error);
  //       });
  //     return [...(await acc), ...pageOrders];
  //   }, []);

  //   const orders = ordersApiResult.map((order) => {
  //     const metaData = order.meta_data;
  //     const fee = metaData[5].value;
  //     const id = order.id;
  //     const status = order.status;
  //     const amount = order.total;
  //     const net = amount - fee;
  //     const orderFirstName = order.billing.first_name;
  //     const orderLastName = order.billing.last_name;
  //     const orderEmail = order.billing.email;
  //     const rawInfo = order.line_items[0].meta_data.slice(1);
  //     const info = rawInfo.reduce(
  //       (acc, options) => {
  //         const weirdWorkshopName =
  //           "Un encuentro para reflexionar (taller para lideres y pastores) PARTE 1 y 2";
  //         const day =
  //           options.key === "Día" ? options.value.split("(")[0] : null;
  //         const blockOne = options.key === "Taller 1/3" ? options.value : null;
  //         const blockTwo =
  //           blockOne === weirdWorkshopName
  //             ? weirdWorkshopName
  //             : options.key === "Taller 2/3"
  //             ? options.value
  //             : null;
  //         const blockThree =
  //           options.key === "Taller 3/3" ? options.value : null;
  //         return {
  //           ...acc,
  //           day: acc.day || day,
  //           blockOne: acc.blockOne || blockOne,
  //           blockTwo: acc.blockTwo || blockTwo,
  //           blockThree: acc.blockThree || blockThree,
  //         };
  //       },
  //       {
  //         day: null,
  //         blockOne: null,
  //         blockTwo: null,
  //         blockThree: null,
  //       }
  //     );

  //     return {
  //       id,
  //       status,
  //       amount,
  //       fee,
  //       net,
  //       orderFirstName,
  //       orderLastName,
  //       orderEmail,
  //       info,
  //     };
  //   });
  //   return orders;
  // }

  const updateOrderWebList = async () => {
    setLoadState(true);
    // const orders = await getOrdersFromWowCommerce();
    const ordersResult = await getDataFromTabWeb("Asistentes");
    console.log({ ordersResult });

    const orders = ordersResult.map(
      ({
        TicketID,
        "Nombre del asistente": name,
        "Apellido del asistente": surname,
        "Talleres Día 1 – Mañana": block1,
        "Talleres Día 1 - Tarde": block2,
        "Talleres Día 2 - Mañana": block3,
        "Correo electrónico del asistente": email1,
        "Correo electrónico del comprador": email2,
        "Estado del pedido": status,
      }) => {
        // const reduceSurname = surname
        //   .split(" ")
        //   .map((txt) => _.capitalize(txt[0]))
        //   .join(".");

        return {
          id: TicketID,
          name,
          surname,
          block1,
          block2,
          block3,
          email: `${email1} / ${email2}`,
          status,
        };
      }
    );
    console.log({ orders });
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
          onCellClick={(e) => showDetails(e)}
        />
      </div>
      <section className="workshopsModal">
        <Modal
          active={activeModal}
          title={<h1>DETALLES</h1>}
          body={<BasicInfoModal content={modalContent} showAllinfo />}
          closeAction={() => setActiveModal(!activeModal)}
          actBtn
          btnName={"Close"}
          btnAction={() => setActiveModal(!activeModal)}
          size="medium"
          border
          clickOutsideModal={true}
        />
      </section>
    </section>
  );
}

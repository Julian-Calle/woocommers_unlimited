import React, { useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as _ from "lodash";
import "../CSS/workShops.css";
import useGeneralContext from "../hooks/useGeneralContext";
import Modal from "../components/Modal";
import BasicInfoModal from "../components/BasicInfoModal";

export default function WorkShops() {
  const { basicColumnsInfo, orderList, loadTable } = useGeneralContext();
  const runUniqueUseEffect = useRef(true);
  const [loadState, setLoadState] = useState(true);
  const [activeModal, setActiveModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const showDetails = (e) => {
    setModalContent(e.row);
    setActiveModal(true);
  };

  useEffect(() => {
    if (runUniqueUseEffect.current) {
      loadTable();
      setLoadState(false);

      runUniqueUseEffect.current = false;
    }
  }, []);

  const orderEdited = orderList.map(
    ({ id, name, surname, block1, block2, block3 }) => {
      const reduceSurname = surname
        .split(" ")
        .map((txt) => _.capitalize(txt[0]))
        .join(".");

      return {
        id,
        name,
        surname: reduceSurname,
        block1,
        block2,
        block3,
      };
    }
  );

  return (
    <section className="sectionContainer">
      <h1 className="containerTittle">Encuentra tus talleres</h1>
      <div className="dataGridContainer workshopsTable">
        <DataGrid
          rows={orderEdited}
          columns={basicColumnsInfo}
          // pageSize={3}
          rowsPerPageOptions={[100]}
          autoPageSize
          // columnBuffer={0}
          // disableExtendRowFullWidth={true}
          disableSelectionOnClick
          loading={loadState}
          disableColumnMenu
          onCellClick={(e) => showDetails(e)}
          // checkboxSelection
        />
      </div>
      <section className="workshopsModal">
        <Modal
          active={activeModal}
          title={<h1>DETALLES</h1>}
          body={<BasicInfoModal content={modalContent} showAllinfo={false} />}
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

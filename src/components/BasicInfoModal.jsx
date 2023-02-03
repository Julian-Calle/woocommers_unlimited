import React from "react";

export default function BasicInfoModal({ content, showAllinfo }) {
  return (
    <section className="infoContainer">
      <h4>{`${content.name} ${content.surname}`}</h4>
      <section className="detailsSections">
        {content.block1 && (
          <section className="infoOption">
            <h4>Taller 1:</h4>
            <span> </span>
            <p>{`${content.block1}`}</p>
          </section>
        )}
        {content.block2 && (
          <section className="infoOption">
            <h4>Taller 2:</h4>
            <p>{`${content.block2}`}</p>
          </section>
        )}
        {content.block3 && (
          <section className="infoOption">
            <h4>Taller 3:</h4>
            <p>{`${content.block3}`}</p>
          </section>
        )}
        {content.email && showAllinfo && (
          <section className="infoOption">
            <h4>Correo:</h4> <span> </span>
            <p className="wrappableText">{`${content.email}`}</p>
          </section>
        )}
      </section>
    </section>
  );
}

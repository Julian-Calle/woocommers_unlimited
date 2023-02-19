import React from "react";
import { useForm } from "react-hook-form";
import DynamicOptions from "./DynamicOptions";

export default function SubscriptionForm({ sendAction, options }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    sendAction(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="subscriptionForm">
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
          <label type="email" htmlFor="email">
            Correo
          </label>
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
            <DynamicOptions options={options?.block1} />
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
            <DynamicOptions options={options?.block2} />
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
            <DynamicOptions options={options?.block3} />
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
    </form>
  );
}

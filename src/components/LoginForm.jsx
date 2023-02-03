import React from "react";
import { useForm } from "react-hook-form";
import "../CSS/login.css";
export default function LoginForm({ submitAction, cancelAction }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    submitAction(data.password);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
      <div className="inputContainerloginForm">
        <input
          type={"password"}
          placeholder="    password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="formError">Password es obligatorio</span>
        )}
      </div>
      <section className="buttonsFormContainer">
        <button className="btn-38 test ">
          <span className="new"> Clic to login </span>
          <div className="old">
            <span>login</span>
            <span>login</span>
          </div>
        </button>
        <button onClick={cancelAction} className="btn-38 test ">
          <span className="new"> Clic to Cancel </span>
          <div className="old">
            <span>Cancel</span>
            <span>Cancel</span>
          </div>
        </button>
      </section>
    </form>
  );
}

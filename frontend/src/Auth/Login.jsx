import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import logo from "../assets/IMG/grupo-carval-Logo-Bioart.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

import RecoverCode from "./Recovering/RecoverCode";
function Login() {
  const navigate = useNavigate();
  const { GetIn, Errores } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await GetIn(data);

      if (Errores == null) {
        if (res.data.status == 200) {
          Swal.fire({
            position: "center",
            showClass: {
              popup: "Swal animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            icon: "success",
            title: "Inicio de sesión correcto!",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate("/");
            location.reload();
          });
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="d-flex  align-items-center justify-content-center ">
        <div
          id="form-container"
          className="  gap-3 py-3  mt-4"
          style={{ width: "300px", maxWidth: "30rem" }}
        >
          <div className="d-flex justify-content-center flex-column align-items-center">
            {/* <div className="signUpHeader">
            <h3> <strong>Bienvenido</strong> </h3>
            </div> */}
            <div
              className="d-flex align-items-center px-3"
              style={{ height: "80px", borderRadius: "200px" }}
            >
              <img src={logo} alt="" width={200} />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <form action="" className="w-75" onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex flex-column gap-2 justify-content-center ">
                {Errores &&
                  Errores.map((error) => (
                    <div key={0} className="spanError">
                      <div></div>
                      {error}
                    </div>
                  ))}
                <div className="form-floating rounded ">
                  <input
                    type="email"
                    className="form-control form-control-sm inputs "
                    id="floatingInput"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="errorMsg">Este campo es requerido</p>
                  )}
                  <label htmlFor="floatingInput">Correo </label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control form-control-sm inputs"
                    id="floatingPassword"
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <p className="errorMsg">Este campo es requerido</p>
                  )}

                  <label htmlFor="floatingPassword">Contraseña</label>
                </div>

                <div className="d-flex justify-content-center w-100 mt-3">
                  <button className="btn btn-success w-75">
                    Iniciar sesión
                  </button>
                </div>
              </div>
            </form>
            <div className="d-flex  flex-column mt-3  align-items-center justify-content-between w-100 px-2 ">
              <div>
                <Link className="initLink " to={"/enterEmail"}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

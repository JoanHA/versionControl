import React, { useEffect, useState } from "react";
import "../../assets/CSS/recovery.css";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
// import { changePasswordEmail } from "../../api/user.controller";
import {  useNavigate } from "react-router-dom";
function RecoverPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate =useNavigate()
  const [error, setError] = useState(false);
  const { email } = useAuth();

  const onSubmit = async (data) => {
    if (data.password != data.confirmPassword) {
      return setError(true);
    }
    try {
      const res = await changePasswordEmail({ email, password: data.password });
      if (res.status == 200) {
        swal.fire("Tu contraseña ha sido cambiada", "", "success").then(() => {
          navigate("/login");
        });
      }else{
        swal.fire("Tuvimos un error intenta mas tarde", "", "error").then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
    
      swal.fire("No pudimos cambiar tu contraseña", ` ${error.response.data}`, "error").then(() => {
        navigate("/login");
      });
    }
   
  };
  useEffect(() => {
    const time = setTimeout(() => {
      setError(false);
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  }, [error]);
  return (
    <div>
      <div className="my-5 text-center rounded verifyPassword d-flex flex-column gap-1 mx-auto">
        <div className="d-flex flex-column">
          <h2 style={{ fontWeight: "bolder" }} className="align-self-start">
            Cambiar contraseña
          </h2>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column">
              <label className="align-self-start">Nueva contraseña</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 8,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/  })}
                className="form-control"
              />
              {errors.password?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  La contraseña debe tener al menos 8 caracteres
                </p>
              )}
            </div>
            <div className="d-flex flex-column">
              <label className="align-self-start">Confirmar contraseña</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  minLength: 8,
                })}
                className="form-control"
              />
              {errors.confirmPassword?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
              {errors.confirmPassword?.type === "minLength" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  La contraseña debe tener al menos 8 caracteres
                </p>
              )}
                {
                      errors.password?.type=="pattern" && (
                        <p className="errorMsg">La contraseña debe tener Mayúsculas, Minúsculas, Números y carácteres especiales</p>
                      )
                    }
            </div>
            {error && <p className="errorMsg">Las contraseñas no conciden</p>}
            <div className="w-100 mt-2">
              <div>
                <button className="btn btn-primary btn-block w-100">
                  Restablecer contraseña
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecoverPassword;

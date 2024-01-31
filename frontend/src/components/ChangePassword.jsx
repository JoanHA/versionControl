import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { passwordChanger } from "../api/users";
function ChangePassword() {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const onsubmit = async (values) => {
    if (values.password !== values.password2) {
      return swal.fire("Las contraseñas no coinciden", "", "error");
    }
    Swal.fire({
      title: "Espera!",
      text: "Estas seguro?. Esta acción no se podrá revertir",
      icon: "question",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
      
        const data = {
          id: params.id,
          password: values.password,
        };
        try {
          const res = await passwordChanger(data);
          console.log(res);
          if (res.status === 200) {
            swal.fire(res.data, "", "success").then(()=>{
              reset();
              close();
            });
          }
        } catch (error) {
          swal.fire(error.response.data, "", "error");
        }
      }
    });
  };
  const close = () => {
    document.querySelector("#changePassId").classList.add("d-none");
  };
  return (
    <div className="d-none" id="changePassId">
      <div className="d-flex  align-items-center justify-content-center h-75">
        <div className="card" style={{ width: "500px" }}>
          <div className="card-header">Cambiar contraseña de usuario</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="d-flex flex-column gap-3">
                <div className="form-group">
                  <label>Nueva contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                    })}
                  />
                  {errors.password?.type == "pattern" && (
                    <p className="errorMsg">
                      La contraseña debe tener Mayúsculas, Minúsculas, Números y
                      carácteres especiales
                    </p>
                  )}

                  {errors.password && errors.password.type === "required" ? (
                    <div className="errorMsg">Este campo es requerido</div>
                  ) : null}
                  {errors.password?.type === "minLength" && (
                    <p className="errorMsg">
                      La contraseña debe de tener minimo 8 carácteres
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="">Confirmar contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("password2", {
                      required: true,
                      minLength: 8,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                    })}
                  />
                  {errors.password2?.type == "pattern" && (
                    <p className="errorMsg">
                      La contraseña debe tener Mayúsculas, Minúsculas, Números y
                      carácteres especiales
                    </p>
                  )}

                  {errors.password2 && errors.password2.type === "required" ? (
                    <div className="errorMsg">Este campo es requerido</div>
                  ) : null}
                  {errors.password2?.type === "minLength" && (
                    <p className="errorMsg">
                      La contraseña debe de tener minimo 8 carácteres
                    </p>
                  )}
                </div>
                <div className="form-group d-flex gap-2">
                  <button className="btn btn-success">Guardar</button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={close}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;

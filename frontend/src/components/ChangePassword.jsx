import React from "react";
import { useForm } from "react-hook-form";

function ChangePassword() {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onsubmit = (values)=>{
        console.log(values)
  }
  const close = ()=>{
    document.querySelector("#changePassId").classList.add("d-none")
  }
  return (
    <div className="d-none" id="changePassId">
      <div className="d-flex  align-items-center justify-content-center h-75">
        <div className="card" style={{ width: "500px", height: "300px" }}>
          <div className="card-header">Cambiar contraseña de usuario</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="d-flex flex-column gap-3">
                <div className="form-group">
                  <label>Nueva contraseña</label>
                  <input type="password" className="form-control" {...register("d",{required:true})} />
                </div>
                <div className="form-group">
                  <label htmlFor="">Confirmar contraseña</label>
                  <input type="password" className="form-control" {...register("d",{required:true})} />
                </div>
                <div className="form-group d-flex gap-2">
                  <button className="btn btn-success">Guardar</button>
                  <button className="btn btn-danger" type="button" onClick={close}>
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

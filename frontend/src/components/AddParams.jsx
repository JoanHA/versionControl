import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { newParam } from "../api/parameters";
function AddParams({ name, typeid, id = null, callback }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    if (id) {
      return;
    }
    crearParametro(values);
  };

  const close = () => {
    //Cerrar modal
    document.getElementById("AddParams").classList.add("d-none");
    document.getElementById("AddParams").style.display = "none";
    document.getElementById("AddParams").style.opacity = 0;
    reset();
  };
  const crearParametro = async (values) => {
    const datos = {
      paramtype_id: values.paramtype_id,
      value: values.value,
    };
    try {
      const res = await newParam(datos);
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Parametro creado con exito!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
            callback();
            document.getElementById("AddParams").classList.add("d-none");
            document.getElementById("AddParams").style.display = "none";
            document.getElementById("AddParams").style.opacity = 0;
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const editarParametros = async(values)=>{
    try {
        
    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error.response.data,
            showConfirmButton: false,
            timer: 1500,
          });
    }
  }
  useEffect(() => {
    reset({
      name: name,
      paramtype_id: typeid,
    });
  }, [name]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="modal d-none  modalBack d-flex align-items-center justify-content-center"
          id={"AddParams"}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {id ? "Editar" : "Crear"} parametros
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={close}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row gap-2 justify-content-center ">
                  <div className="col-5">
                    <div>
                      <label htmlFor="">Parametro</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        disabled
                        {...register("name")}
                      />
                      <input type="hidden" {...register("paramtype_id")} />
                    </div>
                  </div>
                  <div className="col-5">
                    <div>
                      <label htmlFor="">Valor</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        {...register("value")}
                      />
                      {errors.value?.type === "required" && (
                        <p className="errorMsg" style={{ fontSize: "12px" }}>
                          Este campo es obligatorio
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={close}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddParams;

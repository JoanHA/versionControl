import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteParam, editParam, newParam } from "../api/parameters";
function AddParams({ name, typeid, id = null, callback, value = null }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          return editarParametros(values);
        }
        crearParametro(values);
      }
    });
    return;
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
  const editarParametros = async (values) => {
    values.id = id;
    delete values.paramtype_id;
    delete values.name;
    try {
      const res = await editParam(values);
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Editado correctamente!",
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
  const deleteParams = async () => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (id) {
          try {
            const res = await deleteParam(id);
            if (res.status === 200) {
              swal.fire(res.data, "", "success").then(()=>{
                callback();
                document.getElementById("AddParams").classList.add("d-none");
                document.getElementById("AddParams").style.display = "none";
                document.getElementById("AddParams").style.opacity = 0;
              });
            }
          } catch (error) {
            console.log(error);
            swal.fire(error.response.data, "", "error");
          }
        }
      }
    });
  };
  useEffect(() => {
    reset({
      name: name,
      paramtype_id: typeid,
    });
  }, [name]);
  useEffect(() => {
    if (id) {
      reset({
        name: name,
        paramtype_id: typeid,
        value: value,
      });
    }
  }, [value]);
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
                <button className="btn btn-primary">Guardar</button>
                {id && (
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={deleteParams}
                  >
                    Eliminar
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={close}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddParams;

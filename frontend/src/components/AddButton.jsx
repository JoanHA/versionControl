import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import uniqid from "uniqid";
import { newParam } from "../api/parameters";
function AddButton({ param, cb }) {

  //Prevenir se de el submit con enter
  document.querySelector('form')?.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evitar la acción por defecto (enviar el formulario)
    }
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [id, setId] = useState("");
  const [params, setParams] = useState({});
  const [error, setError] = useState(false);
  const onSubmit = async () => {
    const value = watch("value");
    if (value === "") {
      setError(true);
      return;
    }
    const datos = {
      paramtype_id: watch("paramtype_id"),
      value,
    };
    try {
      const res = await newParam(datos);

      if (res.status === 200) {
        swal
          .fire(`${watch("name")} guardada con exito! `, "", "success")
          .then(async () => {
            await cb();
            reset();
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setId(uniqid());
    setParams(param);
    reset({
      paramtype_id: param.value,
      name: param.name,
    });
  }, []);
  useEffect(() => {
    setId(uniqid());
    setParams(param);
    reset({
      paramtype_id: param.value,
      name: param.name,
    });
  }, [param]);
  const close = () => {
    //Cerrar modal
    document.getElementById(id).classList.add("d-none");
    document.getElementById(id).style.display = "none";
    document.getElementById(id).style.opacity = 0;
  };
  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-primary btn btn-secondary  medium-rounded-right"
          onClick={() => {
            document.getElementById(id).classList.remove("d-none");
            document.getElementById(id).style.display = "block";
            document.getElementById(id).style.opacity = 1;
          }}
        >
          +
        </button>
      </div>
      <div

  className="modal d-none  modalBack d-flex align-items-center justify-content-center"
        id={id}
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
                Agregar parametros
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
                      
                      onKeyUp={(e) => {
                        e.target.value !== "" && setError(false);
                      }}
                      {...register("value")}
                    />
                    {error && (
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddButton;

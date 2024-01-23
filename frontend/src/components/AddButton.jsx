import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
function AddButton({ param }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [params, setParams] = useState({});
  const onSubmit = () => {
    setParams(param)
    console.log(params);
    const { name } = watch();
  };
  useEffect(() => {
    setParams(param)
    reset({
      paramtype_id: param.value,
      name: param.name,
    });
  }, []);
  const close = () => {
    //Cerrar modal
    document.getElementById("staticBackdrop").classList.add("d-none");
    document.getElementById("staticBackdrop").style.display = "none";
    document.getElementById("staticBackdrop").style.opacity = 0;
  };
  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-primary btn btn-secondary  medium-rounded-right"
          onClick={() => {
            document
              .getElementById("staticBackdrop")
              .classList.remove("d-none");
            document.getElementById("staticBackdrop").style.display = "block";
            document.getElementById("staticBackdrop").style.opacity = 1;
          }}
        >
          +
        </button>
      </div>
      <div
        className="modal d-none  d-flex align-items-center justify-content-center"
        id="staticBackdrop"
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
                      {...register("value", { required: true })}
                    />
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

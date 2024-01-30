import React from "react";
import { useForm } from "react-hook-form";
import { saveMasive } from "../api/documentsAPI";

function Masived() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    try {
      const res = await saveMasive(formData);
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="modal "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header">
                <h4>Ingreso masivo de documentos</h4>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                  <div className="">
                    {" "}
                    <h2>Ingresa la plantilla de excel</h2>
                  </div>
                  <div className="">
                    <input
                      type="file"
                      className="form-control"
                      {...register("file", { required: true })}
                    />
                    {errors.file?.type === "required" && (
                      <p className="errorMsg text-center">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button className="btn btn-primary">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Masived;

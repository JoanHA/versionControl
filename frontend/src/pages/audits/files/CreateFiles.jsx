import React from "react";
import { useForm } from "react-hook-form";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createFile } from "../../../api/AuditAPI/process";

function CreateFiles() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("files", values.file[0]);
    formData.append("original_name", values.original_name);
    formData.append("file_type", values.file_type);
    try {
      const res =await createFile(formData);

      swal.fire(res.data, "", "success").then(() => reset());
    } catch (error) {
      console.log(error);
      swal.fire(error.response.data, "", "error");
    }
  };

  return (
    <div className="px-2">
      <div className="titleHeader">Subir archivos de consulta</div>
      <div className="px-3">
        <Link to="/audits/files">
          <FaArrowCircleLeft size={20} />
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container w-75 d-flex flex-column gap-2">
          <div>
            <label htmlFor="" className="">
              {" "}
              Nombre del archivo
            </label>
            <input
              type="text"
              placeholder="Archivo..."
              className="form-control"
              {...register("original_name", { required: true })}
            />
            {errors.original_name?.type === "required" && (
              <p className="errorMsg">Este campo es obligatorio</p>
            )}
          </div>
          <div>
            <label htmlFor="" className="">
              {" "}
              Tipo de archivo
            </label>
            <input
              {...register("file_type", { required: true })}
              type="text"
              className="form-control"
              placeholder="Excel, word, PDF, ETC"
            />
            {errors.file_type?.type === "required" && (
              <p className="errorMsg">Este campo es obligatorio</p>
            )}
          </div>

          <div>
            <label htmlFor="" className="">
              {" "}
              Agrega el archivo
            </label>
            <input
              type="file"
              className="form-control"
              {...register("file", { required: true })}
            />
            {errors.file?.type === "required" && (
              <p className="errorMsg">Este campo es obligatorio</p>
            )}
          </div>
          <div>
            <button className="btn btn-success" >Subir archivo</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateFiles;

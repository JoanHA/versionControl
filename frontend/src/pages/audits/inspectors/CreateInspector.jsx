import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaArrowCircleLeft } from "react-icons/fa";
import {
  createInspectors,
  deleteInspectors,
  getOneInspector,
  updateInspector,
} from "../../../api/AuditAPI/inspectorsAPI";
import { useNavigate, useParams } from "react-router-dom";

function CreateInspector() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("job", values.job);
    formData.append("enroll_date", values.enroll_date);
    for (let i = 0; i < values.file.length; i++) {
      const element = values.file[i];
      formData.append("files", element);
    }

    Swal.fire({
      title: "Estas seguro de esto?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, guardar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (params.id) {
          try {
            const res = await updateInspector(params.id, formData);
            swal.fire(res.data, "", "success");
            navigate("/audits/inspectors");
          } catch (error) {
            swal.fire("Lo sentimos..." + error.response.data, "", "error");
          }
        } else {
          try {
            const res = await createInspectors(formData);
            swal.fire(res.data, "", "success");
            reset();
          } catch (error) {
            swal.fire("Lo sentimos..." + error.response.data, "", "error");
          }
        }
      }
    });
  };

  const getInfo = async () => {
    try {
      const res = await getOneInspector(params.id);
      const user = res.data.user;
      reset({
        full_name: user.full_name,
        job: user.job,
        enroll_date: user.enroll_date.split("T")[0],
      });
    } catch (error) {
      console.error(error);
      swal.fire("Lo sentimos..." + error.response.data, "", "error");
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  const deleteInspector = async () => {
    try {
      Swal.fire({
        title: "Estas seguro de esto?",
        text: "No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, guardar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteInspectors(params.id);
          swal.fire(res.data, "", "success").then(() => {
            navigate("/audits/inspectors");
          });
        }
      });
    } catch (error) {
      swal.fire("Lo sentimos..." + error.response.data, "", "error");
    }
  };

  return (
    <div>
      <div className="titleHeader">Registrar auditores internos</div>
      <div className="">
        <button
          className="btn my-1"
          onClick={() => {
            history.back();
          }}
        >
          <FaArrowCircleLeft size={20} />
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row m-0 px-4 py-3 gap-3">
            <div className="col-12 row">
              <div className="col-4">
                <label htmlFor="">Nombre completo:</label>
              </div>
              <div className="col-5 flex-grow-1">
                <input
                  className="form-control"
                  type="text"
                  placeholder=" John Done..."
                  {...register("full_name", { required: true })}
                />

                {errors.full_name?.type === "required" && (
                  <>
                    <p className="errorMsg">Este campo no puede estar vacio</p>
                  </>
                )}
              </div>
            </div>
            <div className="col-12 row">
              <div className="col-4">
                <label htmlFor="">Cargo:</label>
              </div>
              <div className="col-5 flex-grow-1">
                <input
                  className="form-control "
                  type="text"
                  placeholder="Auditor lider..."
                  {...register("job", { required: true })}
                />
                {errors.job?.type === "required" && (
                  <>
                    <p className="errorMsg">Este campo no puede estar vacio</p>
                  </>
                )}
              </div>
            </div>
            <div className="col-12 row">
              <div className="col-4">
                <label htmlFor="">Fecha de ingreso:</label>
              </div>
              <div className="col-5 flex-grow-1">
                <input
                  className="form-control"
                  type="date"
                  {...register("enroll_date", { required: true })}
                />
                {errors.enroll_date?.type === "required" && (
                  <>
                    <p className="errorMsg">Este campo no puede estar vacio</p>
                  </>
                )}
              </div>
            </div>
            <div className="col-12 row">
              <div className="col-4">
                <label htmlFor="">
                  {params.id ? "Agregar archivo" : "Certificado Adjunto:"}
                </label>
              </div>
              <div className="col-6 flex-grow-1">
                <input
                  className="form-control"
                  type="file"
                  multiple
                  {...register("file")}
                />
              </div>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-success">
                {params.id ? "Editar" : "Guardar"}
              </button>

              {
                params.id &&     <button
                className="btn btn-danger"
                type="button"
                onClick={deleteInspector}
              >
                Eliminar
              </button>
              }
          
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateInspector;

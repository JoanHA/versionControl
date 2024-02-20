import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllDocuments } from "../../api/documentsAPI";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createChange, editChange, getOneChange } from "../../api/changes";

function CreateChange() {
  const [codigos, SetCodigos] = useState([]);
  const [data, setData] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState({});
  const params = useParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    Swal.fire({
      title: "Estas seguro de esto?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, guardar!",
    }).then(async (result) => {
      values.status = values.status === true ? 3 : 1;
      if (params.id) {
        return editChanges(values);
      }
      if (values.change) {
        values.new_version = selectedDoc.version;
      } else {
        values.new_version = values.status === 1 ? selectedDoc.version + 1 : 0;
      }
      if (result.isConfirmed) {
        values.code = params.code ? params.code : selectedDoc.code;
      
        try {
          const res = await createChange(values);
          if (res.status === 200) {
            swal.fire("Cambio agregado con éxito", "", "success").then(() => {
              reset();
            });
          }
        } catch (error) {
          console.log(error);
          swal.fire(error.response.data, "", "error");
        }
      }
    });
  };

  const editChanges = async (data) => {
    try {
      const res = await editChange(params.id, data);
      if (res.status === 200) {
        swal.fire(res.data, "", "success").then(() => {
          navigate("/changes");
        });
      }
    } catch (error) {
      console.log(error);
      swal.fire(error.response.data, "", "error");
    }
  };
  const handleChange = (e) => {
    const selectedValue = data.filter((element) => element.id === e.value);
    setSelectedDoc(selectedValue[0]);
    reset({
      name: selectedValue[0].name,
    });
  };
  const handleParam = (datos) => {
    const selectedValue = datos.find((element) => element.code === params.code);
    setSelectedDoc(selectedValue);
    reset({
      name: selectedValue?.name,
    });
  };

  const getCodes = async () => {
    try {
      const res = await getAllDocuments();
      setData(res.data);
      const codes = [];
      if (params.code) {
        handleParam(res.data);
      }
      res.data.forEach((e) => {
        if (e.status !== 3) {
          codes.push({
            value: e.id,
            label: e.code,
          });
        }
      });
      SetCodigos(codes);
    } catch (error) {
      console.log(error);
    }
  };
  const getInfo = async () => {
    try {
      const res = await getOneChange(params.id);

      reset({
        aproved_by: res.data.aproved_by,
        claimant: res.data.claimant,
        code: res.data.code,
        details: res.data.details,
        name: res.data.name,
        reason: res.data.reason,
      });
    } catch (err) {
      swal.fire(err.response.data, "", "error");
    }
  };
  useEffect(() => {
    getCodes();
    if (params.id) {
      getInfo();
    }
  }, []);

  return (
    <div>
      <div className="titleHeader">Registrar cambios</div>
      <button
        className="mx-1 btn btn-dark rounded btn-sm mb-1"
        onClick={() => window.history.back()}
      >
        Volver
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto row ">
          <div className="col-12 col-sm-6 ">
            <div className="row mb-2">
              <div className="col-4">
                <label htmlFor="">
                  {" "}
                  <strong>Código</strong>{" "}
                </label>
              </div>
              {params.code ? (
                <>
                  <div className="col-8">
                    <input
                      type="text"
                      {...register("code")}
                      value={params.code}
                      disabled
                      className="form-control"
                    />
                  </div>
                </>
              ) : params.id ? (
                <>
                  <div className="col-8">
                    <input
                      type="text"
                      {...register("code")}
                      value={params.code}
                      placeholder="Codigo"
                      className="form-control"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-8">
                    <Select
                      options={codigos}
                      required
                      onChange={handleChange}
                    ></Select>
                  </div>
                </>
              )}
            </div>
            <div className="row mb-2">
              <div className="col-4">
                <label htmlFor="">
                  {" "}
                  <strong>Titulo del documento</strong>{" "}
                </label>
              </div>
              <div className="col-8">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="form-control"
                  placeholder="Registro..."
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-4">
                <label htmlFor="">
                  {" "}
                  <strong>Solicitante</strong>{" "}
                </label>
              </div>
              <div className="col-8">
                <input
                  {...register("claimant", { required: true })}
                  type="text"
                  className="form-control"
                  placeholder="Solicitante..."
                />
                {errors.claimant?.type === "required" && (
                  <p className="errorMsg">Este campo es obligatorio</p>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-4">
                <label htmlFor="">
                  {" "}
                  <strong>Justificación</strong>{" "}
                </label>
              </div>
              <div className="col-8">
                <input
                  {...register("reason")}
                  type="text"
                  className="form-control"
                  placeholder="Razon del cambio..."
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-4">
                <label htmlFor="">
                  {" "}
                  <strong>Aprobado por</strong>{" "}
                </label>
              </div>
              <div className="col-8">
                <input
                  {...register("aproved_by", { required: true })}
                  type="text"
                  className="form-control"
                  placeholder="Isabel Gomez..."
                />
                {errors.aproved_by?.type === "required" && (
                  <p className="errorMsg">Este campo es obligatorio</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 ">
            <div>
              <label htmlFor="">
                <strong>Detalles</strong>{" "}
              </label>
              <textarea
                {...register("details")}
                cols="30"
                rows="3"
                className="form-control"
                placeholder="Comentarios..."
                style={{ maxHeight: "200px" }}
              ></textarea>
              {errors.details?.type === "required" && (
                <p className="errorMsg">Este campo es obligatorio</p>
              )}
            </div>
            <div className="d-flex gap-2 mt-2 ">
              <input
                type="checkbox"
                name=""
                id=""
                style={{ width: "30px" }}
                className="form-input"
                {...register("status")}
              />
              <strong className="py-2">Estado obsoleto</strong>
            </div>
            <div className="d-flex gap-2 mt-2 ">
              <input
                type="checkbox"
                style={{ width: "30px" }}
                className="form-input"
                {...register("change")}
              />
              <strong className="py-2">Revisión sin cambio de versión </strong>
            </div>
          </div>
          <div className="my-2">
            <button className="btn btn-success shadow rounded">
              Registrar cambio
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateChange;

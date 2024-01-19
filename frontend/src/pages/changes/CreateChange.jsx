import React, { useEffect, useState } from "react";
import SelectInput from "../../components/Select";
import Select from "react-select";
import { getAllDocuments } from "../../api/documentsAPI";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createChange } from "../../api/changes";

function CreateChange() {
  const [codigos, SetCodigos] = useState([]);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState({});
  const params = useParams();
  const onSubmit = async (values) => {
    values.code = selectedDoc.code;
    values.new_version = selectedDoc.version+1
    delete values.name
   try {
    const res = await createChange(values)
    console.log(res)
    if(res.status ===200){
      swal.fire("Cambio agregado con éxito","","success").then(()=>{
        reset();
      })
    }
   } catch (error) {
    console.log(error)
    swal.fire(error.response.data,"","error")
   }
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleChange = (e) => {
    setId(e.value);
    const selectedValue = data.filter((element) => element.id === e.value);
    setSelectedDoc(selectedValue[0]);
    reset({
      name: selectedValue[0].name,
    });
  };

  const getCodes = async () => {
    try {
      const res = await getAllDocuments();
      setData(res.data);
      const codes = [];
      res.data.forEach((e) => {
        codes.push({
          value: e.id,
          label: e.code,
        });
      });
      SetCodigos(codes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCodes();
  }, []);
  return (
    <div>
      <div className="titleHeader py-2 ">Registrar cambios</div>
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
              <div className="col-8">
                <Select
                  options={codigos}
                  required
                  onChange={handleChange}
                ></Select>
              </div>
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
          <div className="col-12 col-sm-6">
            <div>
              <label htmlFor="">
                <strong>Detalles</strong>{" "}
              </label>
              <textarea
                {...register("details", { required: true })}
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

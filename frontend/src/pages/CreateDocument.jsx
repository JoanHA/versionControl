import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { PiUploadSimpleBold } from "react-icons/pi";

import {
  createDocument,
  getAuxiliars,
  getOneDocument,
  updateDocument,
} from "../api/documentsAPI";
import SelectInput from "../components/Select";
import { getProcessTypologies } from "../api/documentsAPI";
import { useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import { formatDate } from "../lib/helper";
import HistoricTable from "../components/HistoricTable";
import Masived from "../components/Masived";
import CreateControl from "./control/CreateControl";
function CreateDocument() {
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formRef = useRef(null);
  const [letterCode, setLetterCode] = useState([]);
  const [docType, setDoctype] = useState([]);
  const [typologies, setTypologies] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [typeValue, setTypeValue] = useState(null);
  const [proValue, setProValue] = useState(null);
  const [showControl, setShowControl] = useState(false);
  const [doc, setDoc] = useState({});
  const params = useParams();

  const fillSelects = async () => {
    const res = await getAuxiliars();
    const pyt = await getProcessTypologies();

    const letter = [];
    const types = [];

    const process = [];
    const typology = [];

    res.data.forEach((e) => {
      e.paramtype_id === 4 ? letter.push(e) : types.push(e);
    });

    pyt.data.forEach((p) => {
      p.paramtype_id === 2
        ? typology.push({
            value: p.id,
            label: p.name,
          })
        : process.push({
            value: p.id,
            label: p.name,
          });
    });
    setLetterCode(letter);
    setDoctype(types);

    setProcesses(process);
    setTypologies(typology);
  };
  const onSubmit = async (values) => {
    Swal.fire({
      title: "Estas seguro de esta acción?",
      text: "No serás capaz de revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, hazlo!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        if (params.id) {
          values.process = values.processSelect;
          values.typology = values.typologySelect;
          values.last_revision = values.date;
          delete values.typologySelect;
          delete values.processSelect;
          delete values.date;
          try {
            const res = await updateDocument(values);
            if (res.status === 200) {
              swal.fire(res.data, "", "success").then(() => {
                reset();
              });
            }
          } catch (error) {
            console.log(error);
            swal.fire("Tuvimos un error intenta mas tarde!", "", "error");
          }
    
          return;
        }
    
        if (!proValue) {
          return swal.fire("El campo proceso es obligatorio", "", "info");
        }
        if (!typeValue) {
          return swal.fire("El campo tipologia es obligatorio", "", "info");
        }
        const data = {
          code: values.codeLetter + values.processInitials + values.versionNumber,
          comments: values.comments,
          last_revision: values.date,
          process: proValue,
          typology: typeValue,
          name: values.name,
          link: values.link,
          version: 1,
        };
        try {
          const response = await createDocument(data);
          if (response.status === 200) {
            swal.fire(response.data, "", "success").then(() => {
              reset();
              handleProcessChange();
              handleTypoChange();
            });
          }
        } catch (error) {
          swal.fire(error.response.data, "", "error");
          console.log(error);
        }
      }
    });
   
  };

  const handleProcessChange = (event) => {
    if (event) {
      setProValue(event.value);
      return;
    }

    setProValue(null);
  };
  const handleTypoChange = (event) => {
    if (event) {
      setTypeValue(event.value);
      return;
    }
    setTypeValue(null);
  };

  //Edit document
  const getAllData = async () => {
    if (params.id) {
      try {
        const res = await getOneDocument(params.id);
        setDoc(res.data[0]);
        reset({
          code: res.data[0].code,
          name: res.data[0].name,
          processSelect: res.data[0].process,
          typologySelect: res.data[0].typology,
          date: res.data[0].last_revision.replaceAll("/", "-"),
          comments: res.data[0].comments,
          link: res.data[0].link,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAllData();
    fillSelects();
  }, []);

  useEffect(() => {
    if (params.id) {
      reset({
        processSelect: doc.process,
        typologySelect: doc.typology,
      });
    }
  }, [typologies]);
  const showCreateControl = (e) => {
    console.log();
    if (e.target.value === "R-") {
      setShowControl(true)
    }else{
      setShowControl(false)

    }
  };
  return (
    <>
      <div>
        <Masived></Masived>
        <div className="titleHeader text-center ">
          {params.id ? "Edición" : "Registro"} de documentos
        </div>
        <div>
          <button
            className="btn btn-dark btn-sm mx-3 py-1"
            onClick={() => history.back()}
          >
            Volver
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          {/* Contenedor flex */}
          <div className="mx-auto row">
            {/* First child */}
            <div className="col-12 col-md-7 ">
              {/* start children */}
              <div className="row mb-2">
                <div className="col-4  py-2">
                  <label htmlFor="">Codigo del documento</label>
                </div>
                <div className="col-8 d-flex align-items-center">
                  {params.id ? (
                    <input
                      {...register("code", { required: true })}
                      type="text"
                      placeholder="R-..."
                      className="form-control rounded  "
                    />
                  ) : (
                    <>
                      <select
                        {...register("codeLetter", { required: true })}
                        style={{ width: "80px", borderTopLeftRadius: "0px" }}
                        className="form-select medium-rounded-left  "
                        onChange={(e) => {
                          showCreateControl(e);
                        }}
                      >
                        <option value="">...</option>
                        {letterCode &&
                          letterCode.map((letter) => (
                            <option key={letter.id} value={letter.name}>
                              {letter.name}
                            </option>
                          ))}
                      </select>
                      <select
                        style={{ width: "80px", borderRadius: "0px" }}
                        {...register("processInitials", { required: true })}
                        className="form-select  "
                      >
                        <option value="">...</option>
                        {docType &&
                          docType.map((type) => (
                            <option key={type.id} value={type.name}>
                              {type.name}
                            </option>
                          ))}
                      </select>
                      <input
                        {...register("versionNumber", { required: true })}
                        type="text"
                        placeholder="00..."
                        className="form-control medium-rounded-right  "
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="row mb-2 ">
                <div className="col-4">
                  <label htmlFor="">Nombre del documento</label>
                </div>
                <div className="col-8">
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="form-control  rounded "
                    placeholder="Registro..."
                  />
                </div>
              </div>
              <div className=" row mb-2">
                <div className="col-4">
                  <label className="">Proceso</label>
                </div>
                <div className="col-8 d-flex ">
                  {params.id ? (
                    <>
                      <select
                        className="form-select rounded"
                        {...register("processSelect")}
                      >
                        {processes.map((e) => (
                          <option value={e.value} key={e.value}>
                            {e.label.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <AddButton
                        param={{ value: 3, name: "Procesos" }}
                        cb={fillSelects}
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex-fill">
                        <SelectInput
                          onChange={handleProcessChange}
                          data={processes}
                          param={{ value: 3, name: "Procesos" }}
                          cb={fillSelects}
                        ></SelectInput>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-4">
                  <label className="me-2">Tipologia</label>
                </div>
                <div className="col-8 d-flex ">
                  {params.id ? (
                    <>
                      <select
                        className="form-select rounded"
                        {...register("typologySelect")}
                      >
                        {typologies.map((e) => (
                          <option  key={e.value} value={e.value} >
                            {e.label.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <AddButton
                        param={{ name: "Tipologias", value: 2 }}
                        cb={fillSelects}
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex-fill">
                        <SelectInput
                          data={typologies}
                          onChange={handleTypoChange}
                          cb={fillSelects}
                          param={{ name: "Tipologias", value: 2 }}
                        ></SelectInput>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-4">
                  <label htmlFor="" className="w-50">
                    Emisión/ Ultima revisión
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="date"
                    {...register("date", { required: true })}
                    className="form-control"
                  />
                </div>
              </div>
              {/* End children */}
            </div>
            {/* Second child */}
            <div className="col-12 col-md-5 ">
              <div className=" d-flex align-items-center gap-2 mb-2">
                <div className="col-3">
                  <label htmlFor="">Observación</label>
                </div>
                <div className="col-9">
                  <textarea
                    style={{
                      maxHeight: "200px",
                    }}
                    {...register("comments", { required: true })}
                    className="form-control  rounded w-100 "
                    cols="30"
                    rows="2"
                  ></textarea>
                </div>
              </div>
              <div className=" row">
                <div className="col-3">
                  <label htmlFor="">Link</label>
                </div>
                <div className="col-9 flex-fill">
                  <input
                    type="text"
                    {...register("link")}
                    className="form-control  rounded  "
                  ></input>
                </div>
              </div>
            </div>
            {/* last child Button */}

            <div className="col-12 align-self-center mt-2  d-flex  align-items-center gap-2">
              <button
                className="shadow btn btn-success   my-2 col-12"
                style={{ maxWidth: "230px" }}
              >
                {params.id ? "Editar" : "Registrar"} documento
              </button>
              {params.id ? (
                ""
              ) : (
                <button
                  type="button"
                  className="btn btn-info shadow "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@fat"
                >
                  Carga masiva <PiUploadSimpleBold />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      <div>
      
      </div>
      <div>{ showControl && <CreateControl  desactivate={true}/>}</div>
    </>
  );
}

export default CreateDocument;

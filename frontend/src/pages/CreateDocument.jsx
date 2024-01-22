import React, { useEffect, useState } from "react";
import "./../assets/CSS/document.css";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  createDocument,
  getAuxiliars,
  getOneDocument,
} from "../api/documentsAPI";
import SelectInput from "../components/Select";
import { getProcessTypologies } from "../api/documentsAPI";
import { useParams } from "react-router-dom";

function CreateDocument() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [letterCode, setLetterCode] = useState([]);
  const [docType, setDoctype] = useState([]);
  const [typologies, setTypologies] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [typeValue, setTypeValue] = useState(null);
  const [proValue, setProValue] = useState(null);
  const [doc, setDoc] = useState({});
  const [def,setDef] = useState({})
  const params = useParams();

  const fillSelects = async () => {
    const res = await getAuxiliars();
    const  pyt= await getProcessTypologies();
    console.log(pyt.data)
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
    reset({
      codeLetter: "R-",
      processInitials: "GE",
    });
  };
  const onSubmit = async (values) => {
    if (!proValue) {
      return swal.fire("El campo proceso es obligario", "", "info");
    }
    if (!typeValue) {
      return swal.fire("El campo tipologia es obligario", "", "info");
    }
    const data = {
      code: values.codeLetter + values.processInitials + values.versionNumber,
      comments: values.comments,
      last_revision: values.date,
      process: proValue,
      typology: typeValue,
      name: values.name,
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
        console.log(res.data);
        setDoc(res.data[0]);
        setDef({
          value: res.data[0].process,
          label: res.data[0].process_name
        });
        reset({
          code:res.data[0].code,
          name:res.data[0].name,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fillSelects();
    getAllData();
    console.log(doc)
    
  }, []);

  useEffect(()=>{
    setDef({
      value: doc.process,
      label: doc.process_name
    });
  },[doc])
  return (
    <div>
      <div className="titleHeader text-center py-1">Registro de documentos</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Contenedor flex */}
        <div className="mx-auto row">
          {/* First child */}
          <div className="col-12 col-md-6 ">
            {/* start children */}
            <div className="row mb-2">
              <div className="col-4  py-2">
                <label htmlFor="">Codigo de registro</label>
              </div>
              <div className="col-8 d-flex">
                {params.id ? (
                        <input
                        {...register("code", { required: true })}
                        type="text"
                        placeholder="R-..."
                        className="form-control rounded  "
                      />
                ) : (
                  <>
                    {" "}
                    <select
                      {...register("codeLetter", { required: true })}
                      style={{ width: "70px" }}
                      className="form-select medium-rounded-left  "
                    >
                      {letterCode &&
                        letterCode.map((letter) => (
                          <option key={letter.id} value={letter.name}>
                            {letter.name}
                          </option>
                        ))}
                    </select>
                    <select
                      style={{ width: "70px" }}
                      {...register("processInitials", { required: true })}
                      className="form-select  "
                    >
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
                  placeholder="Registro ..."
                />
              </div>
            </div>
            <div className=" row mb-2">
              <div className="col-4">
                <label className="">Proceso</label>
              </div>
              <div className="col-8">

                <Select defaultValue={{label:`${def.label? def.label:doc.process_name}`,value:33}} options={processes}></Select>
                <SelectInput
                defaultVal={def}
                  onChange={handleProcessChange}
                  data={processes}
                ></SelectInput>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-4">
                <label className="me-2">Tipologia</label>
              </div>
              <div className="col-8">
                <SelectInput
                  data={typologies}
                  defaultVal={""}
                  onChange={handleTypoChange}
                ></SelectInput>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-4">
                <label htmlFor="" className="w-50">
                  Ultima revisión
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
          <div className="col-12 col-md-6 ">
            <div className=" d-flex align-items-center gap-2">
              <label htmlFor="">Observaciones</label>
              <textarea
                style={{
                  maxHeight: "200px",
                }}
                {...register("comments", { required: true })}
                className="form-control  rounded w-100 "
                cols="30"
                rows="3"
              ></textarea>
            </div>
          </div>
          {/* last child Button */}

          <div className="col-12 align-self-center mt-2">
            <button
              className="shadow btn btn-success rounded  my-2 col-12"
              style={{ maxWidth: "230px" }}
            >
              Registrar documento
            </button>
          </div>
        </div>
      </form>
      <div className=""></div>
    </div>
  );
}

export default CreateDocument;

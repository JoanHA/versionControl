import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import {
  createControl,
  getAllDocuments,
  getAuxiliars,
} from "../../api/documentsAPI";
import { getLastMove } from "../../api/documentsAPI";
import AddButton from "../../components/AddButton";
import { useNavigate, useParams } from "react-router-dom";
import { editControl, getOneControl } from "../../api/controls";
function CreateControl({ desactivate = null }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState([]);

  const [lastMove, setLastMove] = useState([]);
  const [selectedMove, setSelectedMove] = useState(null);

  const params = useParams();
const navigate = useNavigate()
  const [letterCode, setLetterCode] = useState([]);
  const [docType, setDoctype] = useState([]);
  const editControls = async (data) => {
    try {
      const res = await editControl(params.id, data);
      swal.fire(res.data, "", "success").then(() => {
        navigate("/control")
      });
    } catch (error) {
      console.log(error);
      swal.fire(error.response.data, "", "error");
    }
  };
  //Funciones
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
      if (result.isConfirmed) {
        values.last_move = selectedMove;
        values.external = 2;

        if (params.id) {
          values.last_move = parseInt(values.last_move);
          return editControls(values);
        }
        values.code = params.code
          ? params.code
          : `${values.codeLetter}${values.processInitials}${values.versionNumber}`;
        delete values.documentName;
        delete values.versionNumber;
        delete values.processInitials;
        delete values.codeLetter;

        try {
          const res = await createControl(values);
          swal.fire(res.data, "", "success").then(() => {
            reset();
          });
        } catch (error) {
          console.log(error);
          swal.fire(error.response.data, "", "error");
        }
      }
    });
  };
  const handleChange = () => {
    const code = `${watch("codeLetter")}${watch("processInitials")}${watch(
      "versionNumber"
    )}`;
    if (data) {
      const selected = data.find((e) => e.code == code);

      if (selected) {
        reset({
          documentName: selected.name,
        });
      }
    }
  };
  const handleParam = (datos) => {
    const selected = datos.find((e) => e.code == params.code);
    if (selected) {
      reset({
        documentName: selected.name,
      });
    }
  };

  const fillSelects = async () => {
    const res = await getAuxiliars();
    const letter = [];
    const types = [];
    res.data.forEach((e) => {
      e.paramtype_id === 4 ? letter.push(e) : types.push(e);
    });

    setLetterCode(letter);
    setDoctype(types);
  };
  const getLastMoves = async () => {
    try {
      const res = await getLastMove();
      const moves = [];
      res.data.forEach((d) => {
        moves.push({
          value: d.id,
          label: d.name,
        });
      });
      setLastMove(moves);
    } catch (error) {}
  };
  const getCodes = async () => {
    try {
      const res = await getAllDocuments();
      setData(res.data);
      if (params.code) {
        handleParam(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEditData = async () => {
    try {
      const res = await getOneControl(params.id);

      reset({
        code: res.data.code,
        documentName: res.data.name,
        responsible: res.data.responsible,
        saved_in: res.data.saved_in,
        saved_format: res.data.saved_format,
        actived_saved: res.data.actived_saved,
        inactived_saved: res.data.inactived_saved,
      });
      setSelectedMove(res.data.last_move);
    } catch (error) {
      console.log(error);
      swal.fire(error.response.data, "", "error");
    }
  };
  //end funciones
  useEffect(() => {
    fillSelects();
    getCodes();
    getLastMoves();
    if (params.id) {
      getEditData();
    }
  }, []);
  return (
    <div style={{ overflowX: "hidden", height: "100% " }}>
      <div className="titleHeader">Control de registros</div>
      <div>
        {desactivate ? (
          ""
        ) : (
          <button
            className="btn btn-dark btn-sm mx-3"
            onClick={() => history.back()}
          >
            Volver
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row px-3">
          <div className="col-12 col-md-6">
            <div className="row gap-3">
              <div className="row mb-2">
                <div className="col-4  py-2">
                  <label htmlFor="">Código de registro</label>
                </div>
                {params.code ? (
                  <>
                    <div className="col-8 d-flex">
                      <input
                        type="text"
                        {...register("code")}
                        disabled
                        value={params.code}
                        className="form-control"
                      />
                    </div>
                  </>
                ) : params.id ? (
                  <>
                    {" "}
                    <div className="col-8 d-flex">
                      <input
                        type="text"
                        {...register("code")}
                        placeholder="Codigo"
                        value={params.code}
                        className="form-control"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="col-8 d-flex">
                      <select
                        {...register("codeLetter", { required: true })}
                        style={{ width: "70px" }}
                        onChange={handleChange}
                        className="form-select medium-rounded-left  "
                      >
                        <option value="">...</option>
                        {letterCode &&
                          letterCode.map((letter) => (
                            <option key={letter.id} value={letter.name} s>
                              {letter.name}
                            </option>
                          ))}
                      </select>
                      <select
                        style={{ width: "80px", borderRadius: "0px" }}
                        {...register("processInitials", { required: true })}
                        className="form-select"
                        onChange={handleChange}
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
                        onKeyUp={handleChange}
                        className="form-control medium-rounded-right  "
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="col-12 row">
                <div className="col-4">
                  <label>Nombre del registro </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    {...register("documentName", { required: true })}
                    className="form-control"
                    placeholder="Nombre del registro..."
                  />
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-4">
                  <label>Responsable de archivo</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    {...register("responsible", { required: true })}
                    className="form-control"
                    placeholder="Nombre de responsable..."
                  />
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-4">
                  <label>Donde se archiva</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    {...register("saved_in", { required: true })}
                    className="form-control"
                    placeholder="Digital, Fisico..."
                  />
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-4">
                  <label>Como se archiva</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    {...register("saved_format", { required: true })}
                    className="form-control"
                    placeholder="Alfabetico, Consecutivo etc..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row gap-3">
              <div className="col-12 row gap-3">
                <div className="col-12 ">
                  <label htmlFor="">Tiempo de retención</label>
                </div>
                <div className="col-12 row  ">
                  <div className="col-4 me-2">
                    <label htmlFor="">Archivo activo</label>
                  </div>
                  <div className="col-7">
                    <input
                      placeholder="# años"
                      className="form-control"
                      type="text"
                      {...register("actived_saved", { required: true })}
                    />
                  </div>
                </div>
                <div className="col-12 row">
                  <div className="col-4 me-2">
                    <label htmlFor="">Archivo Inactivo</label>
                  </div>
                  <div className="col-7">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="# años"
                      {...register("inactived_saved", { required: true })}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-4">
                  <label htmlFor="">Disposición final</label>
                </div>
                <div className="col-8 d-flex flex-row">
                  {params.id ? (
                    <>
                      <select
                        className="form-select"
                        value={selectedMove}
                        onChange={(e) => setSelectedMove(e.target.value)}
                      >
                        {lastMove &&
                          lastMove.map((e) => (
                            <option value={e.value}>{e.label}</option>
                          ))}
                      </select>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Select
                        options={lastMove}
                        onChange={(e) => {
                          e.value ? setSelectedMove(e.value) : "";
                        }}
                        className="w-75"
                      ></Select>
                      <AddButton
                        param={{ name: "Disposición final", value: 1 }}
                        cb={fillSelects}
                      ></AddButton>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-3">
            <div>
              <button className="btn btn-success rounded shadow">
                Registrar archivo
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateControl;

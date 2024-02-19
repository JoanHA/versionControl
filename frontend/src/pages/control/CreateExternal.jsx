import React, { useEffect, useState } from "react";
import { createExternal, getExternal } from "../../api/changes";
import { useForm } from "react-hook-form";
import AddButton from "../../components/AddButton";
import Select from "react-select";
import { getLastMove } from "../../api/documentsAPI";
import { editControl, getOneControl } from "../../api/controls";
import { useNavigate, useParams } from "react-router-dom";

function CreateExternal() {
  const { register, reset, handleSubmit } = useForm();
  const [lastMove, setLastMove] = useState([]);
  const [selectedMove, setSelectedMove] = useState(null);
  const params = useParams();
  const navigate = useNavigate()
  const onSubmit = (values) => {
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
        values.external = 1;
        values.status = 1;
        values.external = 1;
        if (params.id) {
          return editControls(values)
        }
        try {
          const res = await createExternal(values);
          if (res.status === 200) {
            swal.fire(res.data, "", "success").then(() => {
              reset();
            });
          }
        } catch (error) {
          swal.fire(error.response.data, "", "error");
        }
      }
    });
  };
  const editControls = async (data) => {
    try {
      const res = await editControl(params.id, data);
      swal.fire(res.data, "", "success").then(() => {
      navigate("/external")
      });
    } catch (error) {
      console.log(error);
      swal.fire(error.response.data, "", "error");
    }
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
  const getEditData = async () => {
    try {
      const res = await getOneControl(params.id);
      reset({
        documentName: res.data.documentName,
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
  useEffect(() => {
    getLastMoves();
    if (params.id) {
      getEditData();
    }
  }, []);
  return (
    <div>
      <div className="titleHeader"> Agregar Documento Externo</div>
      <div>
        <button
          className="btn btn-dark btn-sm mx-3"
          onClick={() => history.back()}
        >
          Volver
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row px-3">
          <div className="col-12 col-md-6">
            <div className="row gap-3">
              <div className="row mb-2"></div>
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
                      <Select
                        options={lastMove}
                        onChange={(e) => {
                          e.value ? setSelectedMove(e.value) : "";
                        }}
                        className="w-75"
                      ></Select>
                      <AddButton
                        param={{ name: "Disposición final", value: 1 }}
                        cb={getLastMoves}
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
                Registrar documento
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateExternal;

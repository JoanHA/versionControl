import React, { useEffect, useState } from "react";
import SelectInput from "../../components/Select";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { createControl, getAllDocuments } from "../../api/documentsAPI";
import { getLastMove } from "../../api/documentsAPI";
import AddButton from "../../components/AddButton";
import { useParams } from "react-router-dom";
function CreateControl() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [codigos, SetCodigos] = useState([]);
  const [data, setData] = useState([]);
  const [code, setCode] = useState(null);
  const [lastMove, setLastMove] = useState([]);
  const [selectedMove, setSelectedMove] = useState(null);
  const params = useParams();
  const [defaultValue, setDefaultV] = useState({});

  //Funciones
  const onSubmit = async (values) => {
    values.last_move = selectedMove;
    values.code = code;
    delete values.documentName;
    try {
      const res = await createControl(values);
      swal.fire(res.data, "", "success").then(() => {
        reset();
      });
    } catch (error) {
      console.log(error);
      swal.fire(error.response.data, "", "error");
    }
  };
  const handleChange = (e) => {
    if (e.value) {
      setCode(e.label);
      const selectedValue = data.filter((element) => element.id === e.value);
      reset({
        documentName: selectedValue[0].name,
      });
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
  const getCodes = async () => {
    try {
      const res = await getAllDocuments();
      setData(res.data);

      const codes = [];
      res.data.map((e) => {
        if (e.code.substring(0, 1) === "R") {
          return codes.push({
            value: e.id,
            label: e.code,
          });
        }
      });
      const selected = codes.find((e) => e.code == params.code);
      setDefaultV(selected);
      SetCodigos(codes);
    } catch (error) {
      console.log(error);
    }
  };
  //end funciones
  useEffect(() => {
    getCodes();
    getLastMoves();
  }, []);
  return (
    <div>
      <div className="titleHeader">Control de registros</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row px-3">
          <div className="col-12 col-md-6">
            <div className="row gap-3">
              <div className="col-12 row">
                <div className="col-4">
                  <label>Código</label>
                </div>

                <div className="col-8">
                  <Select
                    {...register("code")}
                    required
                    onChange={handleChange}
                    options={codigos}
                  ></Select>
                </div>
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
                    {" "}
                    <input
                      className="form-control"
                      type="text"
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
                  <Select
                    options={lastMove}
                    onChange={(e) => {
                      e.value ? setSelectedMove(e.value) : "";
                    }}
                    className="w-75"
                  ></Select>
                  <AddButton></AddButton>
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

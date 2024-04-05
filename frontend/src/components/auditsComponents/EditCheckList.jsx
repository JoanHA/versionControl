import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { editChecklist, getOneList } from "../../api/AuditAPI/checklistAPI";

function EditCheckList() {
  const [data, setData] = useState({});
  const [reqs, setReqs] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
  } = useForm();
  const params = useParams();

  const getCheckData = async () => {
    try {
      const res = await getOneList(params.id);
      setData(res.data.checklist[0]);

      setReqs(res.data.fields);

    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    getCheckData();
  }, []);

  const saveCheck = async (values) => {
    try {
      const res = await editChecklist(params.id,values);
      swal.fire(res.data, "", "success").then(()=>history.back());
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  //Para Archivarlo y no poder editar mas
  const onSubmit = async (values) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Despues de guardar esta lista no podrás editarla de nuevo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
    }).then((result) => {
      if (result.isConfirmed) {
        //Convertir los datos del values en un array
        const datos = Object.entries(values);

        const valores = [];
        //recorrer el array creado para encontrar los campos que van en la base de datos y guardarlos en un objeto para enviarlos a un array
        for (let j = 0; j < reqs.length; j++) {
          for (let i = 0; i < datos.length; i++) {
            if (datos[i][0] === `pregunta${j}`) {
              valores.push({
                question: datos[i][1],
                iso_9001: datos[i + 1][1] ? parseInt(datos[i + 1][1]) : null,
                iso_45001: datos[i + 2][1] ? parseInt(datos[i + 2][1]) : null,
                filled: datos[i + 3][1] === "filled" ? 1 : 0,
                not_filled: datos[i + 3][1] === "not_filled" ? 1 : 0,
                get_better: datos[i + 3][1] === "get_better" ? 1 : 0,
                observations: datos[i + 4][1],
                id: parseInt(datos[i + 5][1]),
                status: 5,
                audit_plan: parseInt(params.id),
              });
            }
          }
        }
        const send = {
          checkList: {
            id: data.id,
            status: 5,
          },
          fields: valores,
        };
        saveCheck(send);
      }
    });
  };
  //para guardarlo para editar luego
  const archive = () => {
    Swal.fire({
      title: "Esta seguro?",
      text: "Guardarás un borrador de la lista para luego editarlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
    }).then((result) => {
      if (result.isConfirmed) {
        const valores = [];
        //Convertir los datos del values en un array
        const datos = Object.entries(watch());

        //recorrer el array creado para encontrar los campos que van en la base de datos y guardarlos en un objeto para enviarlos a un array
        

        for (let j = 0; j < reqs.length; j++) {
          for (let i = 0; i < datos.length; i++) {

            if (datos[i][0] === `pregunta${j}`) {
              valores.push({
                question: datos[i][1],
                iso_9001: datos[i + 1][1] ? parseInt(datos[i + 1][1]) : null,
                iso_45001: datos[i + 2][1] ? parseInt(datos[i + 2][1]) : null,
                filled: datos[i + 3][1] === "filled" ? true : false,
                not_filled: datos[i + 3][1] === "not_filled" ? true : false,
                get_better: datos[i + 3][1] === "get_better" ? true : false,
                observations: datos[i + 4][1],
                id: parseInt(datos[i + 5][1]),
                status: 4,
                audit_plan: parseInt(params.id),
              });
            }
          }
        }
        const send = {
          checkList: {
            id: data.id,
            status: 4,
          },
          fields: valores,
        };
        saveCheck(send);
      }
    });
  };

  return (
    <div className="px-3">
      <div>
        {/* Campos  */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex gap-2 my-2">
            <button className="btn btn-primary btn-sm">Guardado permanente</button>
            <button
              className="btn btn-success btn-sm"
              type="button"
              onClick={archive}
            >
              Guardar borrador
            </button>
          </div>
          <div className="mb-2">
            <div className="row p-0 m-0 gap-2 ">
              <div className="col-2 check-list-box text-center ">
                <label htmlFor="">
                  <strong>Pregunta</strong>
                </label>
              </div>
              <div className="col-2 check-list-box text-center">
                <label htmlFor="">
                  <strong>Requisito a verificar</strong>
                </label>
              </div>
              <div className="col-1 check-list-box text-center">
                <label htmlFor="">
                  <strong>Cumple</strong>
                </label>
              </div>
              <div className="col-1 check-list-box text-center">
                <label htmlFor="">
                  <strong>No cumple</strong>
                </label>
              </div>
              <div className="col-2 check-list-box text-center">
                <label htmlFor="">
                  <strong>Oportunidad de mejora</strong>
                </label>
              </div>
              <div className="col-3 check-list-box text-center">
                <label htmlFor="">
                  <strong>Observaciones</strong>
                </label>
              </div>
            </div>
            <div className="row p-0 m-0 gap-2 ">
              <div className="col-2  text-center "></div>
              <div className="col-2  text-center">
                <div className="d-flex gap-3 align-items-center justify-content-between">
                  <label htmlFor="">
                    <strong>ISO 9001</strong>
                  </label>
                  <label htmlFor="">
                    <strong>ISO 45001</strong>
                  </label>
                </div>
              </div>
        
            </div>
            {reqs?.length > 0
              ? reqs.map((req, index) => (
                  <div className="row p-0 m-0 gap-2 " key={index}>
                    <div className="col-2  text-center  check-form">
                      <label htmlFor="">
                        <textarea
                          className="form-control"
                          defaultValue={req.question ? req.question: "" }
                          {...register(`pregunta${index}`, { required: true })}
                        ></textarea>
                      </label>
                    </div>
                    <div className="col-2  text-center check-form">
                      <div className="d-flex gap-3 align-items-center justify-content-between">
                        <label htmlFor="">
                          <input
                            type="hidden"
                            {...register(`iso9001${index}`)}
                            className="text-center "
                            value={req.iso9001_type === 801 ? req.iso_9001 : ""}
                          />
                          {req.iso9001_type === 801
                            ? req.iso9001_article
                            : "N/A"}
                        </label>
                        <label htmlFor="" className="my-3">
                          <input
                            type="hidden"
                            className="text-center "
                            {...register(`iso45001${index}`)}
                            value={req.iso45001_type === 802 ? req.iso_45001 : ""}
                          />
                          {req.iso45001_type === 802
                            ? req.iso45001_article
                            : "N/A"}
                        </label>
                      </div>
                    </div>
                    <div className="col-1  text-center check-form">
                      <input
                        type="radio"
                        defaultChecked={req.filled === 1 ? true : false}
                        style={{ width: "30px", height: "30px" }}
                        {...register(`check${index}`)}
                        value={`filled`}
                        className="form-check-input"
                      />
                    </div>
                    <div className="col-1  text-center check-form">
                      <input
                        type="radio"
                        defaultChecked={req.not_filled === 1 ? true : false}
                        style={{ width: "30px", height: "30px" }}
                        className="form-check-input"
                        value={`not_filled`}
                        {...register(`check${index}`)}
                      ></input>
                    </div>
                    <div className="col-2  text-center check-form">
                      <input
                        type="radio"
                        defaultChecked={req.get_better === 1 ? true : false}
                        style={{ width: "30px", height: "30px" }}
                        className="form-check-input"
                        value={`get_better`}
                        {...register(`check${index}`)}
                      ></input>
                    </div>
                    <div className="col-3  text-center check-form">
                      <label htmlFor="">
                        <textarea
                          defaultValue={req.observations ? req.observations: ""}
                          className="form-control"
                          {...register(`observacion${index}`, {
                            required: true,
                          })}
                        ></textarea>
                    <input type="hidden" value={req.id}  {...register(`id${index}`)} />

                      </label>
                    </div>
                  </div>
                ))
              : "No hay requisitos a verificar"}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCheckList;

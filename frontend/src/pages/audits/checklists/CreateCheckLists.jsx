import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getProcessReq } from "../../../api/AuditAPI/process";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createChecklist } from "../../../api/AuditAPI/checklistAPI";
function CreateCheckLists() {
  const { audit_plan } = useAuth();
  const [data, setData] = useState(audit_plan);
  const [reqs, setReqs] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const params = useParams();

  const getReqs = async () => {
   
    try {
      const res = await getProcessReq(data.processes_id);
      setReqs(res.data);
      
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    setData(audit_plan);
    getReqs();
  }, []);

  const saveCheck = async (values) => {
    try {

      const res = await createChecklist(values);
      swal.fire(res.data, "", "success").then(() => history.back());
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  //Guardarlo permanete
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
        const valores = [];
        //Convertir los datos del values en un array
        const datos = Object.entries(values);
        //recorrer el array creado para encontrar los campos que van en la base de datos y guardarlos en un objeto para enviarlos a un array
      
        for (let j = 0; j < reqs.length; j++) {
          for (let i = 0; i < datos.length; i++) {
            if (datos[i][0] === `pregunta${j}`) {
              const valor = {
                 question: datos[i][1],
                 iso_9001: datos[i + 1][1] ? parseInt(datos[i + 1][1]) : null,
                 iso_45001: datos[i + 2][1] ? parseInt(datos[i + 2][1]) : null,
                 filled: datos[i + 4][1] === "filled" ? true : false,
                 not_filled: datos[i + 4][1] === "not_filled" ? true : false,
                 get_better: datos[i + 4][1] === "get_better" ? true : false,
                 observations: datos[i + 5][1],
                 status: 4,
                 audit_plan: parseInt(params.id),
               };
               for (let i = 0; i < datos.length; i++) {
                 if (datos[i][0] === `decreto${j}`) {
                   valor.decreto = datos[i][1] ? parseInt(datos[i][1]) : null
                 }
               }
               valores.push(valor)
             }
          }
        }
      
        const send = {
          checkList: {
            audit_plan: params.id,
            status: 5,
          },
          fields: valores,
        };
        saveCheck(send);
      }
    });
  };
  //Guardarlo borrador
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
             const valor = {
                question: datos[i][1],
                iso_9001: datos[i + 1][1] ? parseInt(datos[i + 1][1]) : null,
                iso_45001: datos[i + 2][1] ? parseInt(datos[i + 2][1]) : null,
                filled: datos[i + 4][1] === "filled" ? true : false,
                not_filled: datos[i + 4][1] === "not_filled" ? true : false,
                get_better: datos[i + 4][1] === "get_better" ? true : false,
                observations: datos[i + 5][1],
                status: 4,
                audit_plan: parseInt(params.id),
              };
              for (let i = 0; i < datos.length; i++) {
                if (datos[i][0] === `decreto${j}`) {
                  valor.decreto =  datos[i][1] ? parseInt(datos[i][1]) : null
                }
              }
            
              valores.push(valor)
            }
          }
        }
        
        const send = {
          checkList: {
            audit_plan: params.id,
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
      <div className="titleHeader">Crear Lista de chequeo</div>
      <div>
        <button
          className="btn"
          onClick={() => {
            history.back();
          }}
        >
          <FaArrowCircleLeft size={20} />
        </button>
        {/* Audit info */}
        <div className="d-flex justify-content-evenly fs-5">
          <div className="d-flex flex-row gap-3">
            <label>
              <strong>Fecha:</strong>
            </label>
            <label>{data?.date}</label>
          </div>
          <div className="d-flex flex-row gap-3">
            <label>
              <strong>Auditor(es):</strong>
            </label>
            <label>
              {data?.field_inspector.length > 0
                ? data.field_inspector.map((ins) => `- ${ins.full_name} `)
                : "N/A"}
            </label>
          </div>
          <div className="d-flex flex-row gap-3">
            <label>
              <strong>Proceso:</strong>
            </label>
            <label>{data?.process_name}</label>
          </div>
        </div>
        <hr />
        {/* Campos  */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex gap-2 my-2">
            <button className="btn btn-success btn-sm">
              Archivar
            </button>
            <button
              className="btn btn-primary btn-sm"
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
                    {" "}
                    <strong>ISO 9001</strong>
                  </label>
                  <label htmlFor="">
                    <strong>ISO 45001</strong>
                  </label>
                  <label htmlFor="">
                    <strong>Decreto 1072</strong>
                  </label>
                </div>
              </div>
              <div className="col-1  text-center"></div>
              <div className="col-1  text-center"></div>
              <div className="col-2  text-center"></div>
              <div className="col-3  text-center"></div>
            </div>
            {reqs?.length > 0
              ? reqs.map((req, index) => (
                  <div className="row p-0 m-0 gap-2 " key={index}>
                    <div className="col-2  text-center  check-form">
                      <label htmlFor="">
                        <textarea
                          className="form-control"
                          {...register(`pregunta${index}`, { required: true })}
                        ></textarea>
                      </label>
                    </div>
                    <div className="col-2  text-center check-form">
                      <div className="d-flex gap-3 align-items-center justify-content-between ">
                        <label htmlFor="" className="">
                          <input
                            type="hidden"
                            {...register(`iso9001${index}`)}
                            className="text-center border-e "
                            value={req.type === 801 ? req.id : null}
                          />
                          {req.type === 801 ? req.article : ""}
                        </label>
                        <label htmlFor="" className="my-3 ">
                          <input
                            type="hidden"
                            className="text-center "
                            {...register(`iso45001${index}`)}
                            value={req.type === 802 ? req.id  : null}
                          />
                          {req.type === 802
                            ? req.article
                            : ""}
                        </label>
                        <label htmlFor="" className="my-3 ">
                          <input
                            type="hidden"
                            className="text-center "
                            {...register(`decreto${index}`)}
                            defaultValue={req.type === 803 ? req.id  : null}
                          />
                          {req.type === 803
                            ? `${req.article}`
                            : ""}
                        </label>
                      </div>
                    </div>
                    <div className="col-1  text-center check-form">
                      <input
                        type="radio"
                        style={{ width: "30px", height: "30px" }}
                        {...register(`check${index}`)}
                        value={`filled`}
                        className="form-check-input"
                      />
                    </div>
                    <div className="col-1  text-center check-form">
                      <input
                        type="radio"
                        style={{ width: "30px", height: "30px" }}
                        className="form-check-input"
                        value={`not_filled`}
                        {...register(`check${index}`)}
                      ></input>
                    </div>
                    <div className="col-2  text-center check-form">
                      <input
                        type="radio"
                        style={{ width: "30px", height: "30px" }}
                        className="form-check-input"
                        value={`get_better`}
                        {...register(`check${index}`)}
                      ></input>
                    </div>
                    <div className="col-3  text-center check-form">
                      <label htmlFor="">
                        <textarea
                          className="form-control"
                          {...register(`observacion${index}`, {
                            required: true,
                          })}
                        ></textarea>
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

export default CreateCheckLists;

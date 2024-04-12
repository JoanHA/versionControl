import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import {
  getFinalReports,
  getOneFinalReport,
} from "../../../api/AuditAPI/final_report";

function CreateFinalReport() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [plan, setPlan] = useState({});
  const [reqs, setReqs] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const params = useParams();
  const getReport = async () => {
    try {
      const res = await getOneFinalReport(params.id);
      console.log(res.data);
      const plan = res.data.auditPlan[0];

      const inspect = res.data.inspectors;
      setPlan(res.data.auditPlan[0]);

      setInspectors(res.data.inspectors);
      reset({
        objective: plan.objective,
        date: plan.validity,
        scope: plan.scope,
        criteria: plan.criteria,
        audit_group: `${inspect.map((e) =>
          ` ${e.full_name} -${e.job} `.concat("\n")
        )}  AUDITOR LIDER: ${plan.leader}`,
      });

      const rq = res.data.requisites.map((r) => {
        if (r.iso_9001) {
          return {
            name: r.iso9001_name,
            type: r.iso9001_type,
            article: r.iso9001_type,
            process_id: r.id,
            process_name: r.name,
          };
        }
        if (r.iso_45001) {
          return {
            name: r.iso4001_name,
            type: r.iso4001_type,
            article: r.iso_4001article,
            process_id: r.id,
            process_name: r.name,
          };
        }
        if (r.decreto) {
          return {
            name: r.decreto_name,
            type: r.decreto_type,
            article: r.decreto_article,
            process_id: r.id,
            process_name: r.name,
          };
        }
      });

      const groupedByProcessId = rq.reduce((acc, currentValue) => {
        const key = currentValue.process_name;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(currentValue);
        return acc;
      }, {});
      console.log(groupedByProcessId);
      setReqs(Object.values(groupedByProcessId));
      console.log();
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    getReport();
  }, []);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="titleHeader">
        <button
          className="btn align-self-start"
          onClick={() => {
            history.back();
          }}
        >
          <FaArrowCircleLeft size={20} />
        </button>
        Creación de reportes finales
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="row border p-2">
            <div className="col-12 col-md-4">
              <div className="d-flex gap-1 flex-column">
                <div>
                  <label htmlFor="objective">
                    <strong>Objetivo:</strong>
                  </label>
                </div>
                <div>
                  <textarea
                    type="text"
                    {...register("objective")}
                    id="objective"
                    className="form-control"
                    placeholder="Objetivo del plan  de accion"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div>
                <label htmlFor="date">
                  <strong>Fecha de auditoria:</strong>
                </label>
              </div>
              <div>
                <input
                  type="text"
                  {...register("date")}
                  id="date"
                  className="form-control"
                  placeholder="Fecha de la auditoria"
                />
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div>
                <label htmlFor="scope">
                  <strong>Alcance:</strong>
                </label>
              </div>
              <div>
                <textarea
                  type="text"
                  {...register("scope")}
                  id="scope"
                  placeholder="Alcance de la auditoria"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12 col-md-12">
              <div>
                <label htmlFor="criteria">
                  <strong>Criterios:</strong>
                </label>
              </div>
              <div>
                <input
                  type="text"
                  {...register("criteria")}
                  id="criteria"
                  placeholder="Criterio de la auditoria"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12 col-md-12">
              <div>
                <label htmlFor="audit_group">
                  <strong>Equipo auditor:</strong>
                </label>
              </div>
              <div>
                <input
                  type="text"
                  {...register("audit_group")}
                  id="audit_group"
                  placeholder="Auditores"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="w-100 bg-secondary d-flex align-items-center justify-content-center  align-items-center rounded my-3 text-light">
            <div className=" fw-bold rounded px-4 py-1 text-center">
              <h3 className="m-0">Desarrollo de la auditoria</h3>
            </div>
          </div>

          <div className="p-2 ">
            <div>
              <div className="d-flex flex-column">
                <div>
                  <strong>
                    <label htmlFor="date">
                      Fecha limite del plan de acción
                    </label>
                  </strong>
                </div>
                <div>
                  <input
                    type="date"
                    {...register("action_plan_closeDate", { required: true })}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="w-100 d-flex justify-content-center">
                <h4 className="titleHeader m-0 p-2 mb-2">Aspectos positivos</h4>
              </div>
              <div>
                <textarea
                  className="form-control"
                  placeholder="Aspéctos positivos "
                  style={{ maxHeight: "200px" }}
                  {...register("positive_aspects", { required: true })}
                ></textarea>
              </div>
            </div>
            <div>
              <div className="w-100 d-flex justify-content-center">
                <h4 className="titleHeader m-0 p-2 my-2">
                  Aspectos por mejorar
                </h4>
              </div>
              <div>
                <textarea
                  className="form-control"
                  style={{ maxHeight: "200px" }}
                  placeholder="Aspéctos mejorar"
                  {...register("negative_aspects", { required: true })}
                ></textarea>
              </div>
            </div>
            <div>
              <div className="w-100 d-flex justify-content-center">
                <h4 className="titleHeader m-0 p-2 my-2">Hallazgos</h4>
              </div>

              <div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Requisito</th>
                      <th>Descripcion de no conformidad</th>
                      <th>Proceso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reqs.length > 0 ? (
                      reqs.map((r, i) => (
                        <tr>
                          <td>
                            <ul>
                              {r.map((d) => (
                                <li>{`${d.article}. ${d.name}`}</li>
                              ))}
                            </ul>
                          </td>
                          <td >
                            <textarea
                              type="text"
                              className="form-control mh-100"
                              placeholder="Descripción..."
                            />
                          </td>
                          <td className="text-center">{r[i].process_name}</td>
                        </tr>
                      ))
                    ) : (
                      <td>No hay datos...</td>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="bg-secondary rounded text-light w-100 d-flex justify-content-center">
                <div className=" fw-bold rounded px-4 py-1 text-center">
                  <h3 className="m-0">
                    Analisis de la eficacia de la auditoria
                  </h3>
                </div>
              </div>
              <div className="row p-2  ">
                <div className="col-12 d-flex flex-column">
                  <strong>
                    <label htmlFor="">
                      Se cumplió el objetivo, alcance y criterios de la
                      auditoria?
                    </label>
                  </strong>

                  <div className="d-flex gap-3 ">
                    <div className="d-flex  align-items-center gap-2">
                      <label htmlFor=""> Si</label>

                      <input
                        type="radio"
                        {...register("filled_objective", { required: true })}
                        className="form-check-input"
                        style={{ width: "30px", height: "25px" }}
                      />
                    </div>
                    <div className="d-flex  align-items-center gap-2">
                      <label htmlFor=""> No</label>

                      <input
                        type="radio"
                        {...register("filled_objective", { required: true })}
                        style={{ width: "30px", height: "25px" }}
                        className="form-check-input"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <strong>
                    <label htmlFor="">
                      Riesgos presentados durante la auditoria y solución dada
                    </label>
                  </strong>
                  <textarea
                    className="form-control"
                    style={{ maxHeight: "200px" }}
                    placeholder="Escribe los riegos presentados..."
                    {...register("presented_risk", { required: true })}
                  ></textarea>
                </div>
                <div>
                  <strong>
                    <label htmlFor="">Otros</label>
                  </strong>
                  <textarea
                    className="form-control"
                    style={{ maxHeight: "200px" }}
                    placeholder="Algún detalle adicional"
                    {...register("others", { required: true })}
                  ></textarea>
                </div>
              </div>
            </div>
            <div>
              <div className=" w-100 d-flex bg-secondary text-light rounded  p2 justify-content-center align- items-center my-2">
                <div className=" fw-bold rounded px-4 py-1 text-center ">
                  <h3 className="m-0">Conclusiones generales</h3>
                </div>
              </div>
              <div className="p-2">
                <textarea
                  className="form-control"
                  style={{ maxHeight: "200px" }}
                  placeholder="Escribe conclusión final..."
                  {...register("conclusions", { required: true })}
                ></textarea>
              </div>
            </div>
            <div className="d-flex gap-3 my-1 px-2 ">
              <button className="btn btn-success">Guardar</button>
              <button className="btn btn-danger" type="reset">
                Borrar todo
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateFinalReport;

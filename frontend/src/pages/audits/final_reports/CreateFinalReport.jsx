import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import {
  CreateFinalReports,
  getFinalReportFinding,
  getFinalReports,
  getOneFinalReport,
} from "../../../api/AuditAPI/final_report";
import SignaturePad from "react-signature-pad-wrapper";

function CreateFinalReport() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const signatureRef = useRef(null);
  const navigate = useNavigate();
  const [plan, setPlan] = useState({});
  const [reqs, setReqs] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const params = useParams();
  const getReport = async () => {
    try {
      const res = await getOneFinalReport(params.id);
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
            requisite_id: r.iso_9001,
            type: r.iso9001_type,
            article: r.iso9001_type,
            process_id: r.id,
            process_name: r.name,
            plan_id: plan.id,
          };
        }
        if (r.iso_45001) {
          return {
            requisite_id: r.iso_45001,
            name: r.iso4001_name,
            type: r.iso4001_type,
            article: r.iso_4001article,
            process_id: r.id,
            process_name: r.name,
            plan_id: plan.id,
          };
        }
        if (r.decreto) {
          return {
            requisite_id: r.decreto,
            name: r.decreto_name,
            type: r.decreto_type,
            article: r.decreto_article,
            process_id: r.id,
            process_name: r.name,
            plan_id: plan.id,
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

      const response = await getFinalReportFinding(
        Object.values(groupedByProcessId)
      );
      setReqs(response.data);
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    getReport();
  }, []);
  const onSubmit = async (data) => {
    delete data.audit_group;
    delete data.criteria;
    delete data.scope;
    delete data.objective;
    delete data.date;
    data.audit_plan = params.id;

    const valores = [];
    //Convertir los datos del values en un array
    const datos = Object.entries(data);

    //recorrer el array creado para encontrar los campos que van en la base de datos y guardarlos en un objeto para enviarlos a un array

    var ids = [];

    for (let j = 0; j < reqs.length; j++) {
      const element = reqs[j];
      for (let i = 0; i < element.length; i++) {
        ids.push(element[i].process_id);
      }
    }
    const final_report_requisites = [];
    ids = [...new Set(ids)];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      for (let j = 0; j < datos.length; j++) {
        const element = datos[j][0];
        if (element == `process_id-${id}`) {
          final_report_requisites.push({
            description: datos[j][1],
            process_id: id,
            requisites: document.querySelector(`#requisites-${id}`).innerHTML,
          });
        }
      }
    }

    var formData = new FormData();
    formData.append("audit_leader_sign", data.audit_leader_sign[0]);
    formData.append("audit_plan", data.audit_plan);
    formData.append("conclusions", data.conclusions);
    formData.append("filled_objective", data.filled_objective);
    formData.append("negative_aspects", data.negative_aspects);
    formData.append("others", data.others);
    formData.append("positive_aspects", data.positive_aspects);
    formData.append("presented_risk", data.presented_risk);
    formData.append("audit_leader", data.audit_leader);
    formData.append("represent", data.represent);
    formData.append("represent_sign", data.represent_sign[0]);
    formData.append(
      "final_report_requisites",
      JSON.stringify(final_report_requisites)
    );

    const res = await CreateFinalReports(formData);
    swal.fire(res.data, "", "success").then(() => {
      navigate("/audits/finalReports/");
    });
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
            <div className="col-12 col-md-4 py-2">
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
                {errors?.positive_aspects?.type === "required" && (
                  <p className="errorMsg">Este campo es obligatorio</p>
                )}
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
                {errors?.negative_aspects?.type === "required" && (
                  <p className="errorMsg">Este campo es obligatorio</p>
                )}
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
                            <ul id={`requisites-${r[i].process_id}`}>
                              {r.map(
                                (d, i) => ` ${`${d.article}. ${d.name}. `}`
                              )}
                            </ul>
                          </td>
                          <td>
                            <textarea
                              type="text"
                              className="form-control mh-100"
                              placeholder="Descripción..."
                              defaultValue={r[i].details}
                              {...register(`process_id-${r[i].process_id}`)}
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
                      <label htmlFor=""> No</label>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          {...register("filled_objective")}
                          id="flexSwitchCheckDefault"
                        />
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckDefault"
                        >
                          Si
                        </label>
                      </div>
                   
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
                  {errors?.presented_risk?.type === "required" && (
                    <p className="errorMsg">Este campo es obligatorio</p>
                  )}
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
                {errors?.conclusions?.type === "required" && (
                  <p className="errorMsg">Este campo es obligatorio</p>
                )}
              </div>
            </div>
            <div className="col-12 my-3">
              <div className=" w-100 d-flex bg-secondary text-light rounded  p2 justify-content-center align- items-center my-2">
                <div className=" fw-bold rounded px-4 py-1 text-center ">
                  <h3 className="m-0"> Revision y aprobacion</h3>
                </div>
              </div>

              <div className="w-100 d-flex justify-content-center">
                <p>
                  <strong>
                    Se aceptan los planes de acción generados por los líderes de
                    procesos, a los hallazgos presentados en la Auditoria
                    Interna, excepto N.A
                  </strong>
                </p>
              </div>

              <div className="d-flex justify-content-center gap-5">
                <div className="d-flex flex-column justify-content-center gap-1">
                  <div>
                    <label className="fw-bold">Ingresa la firma</label>
                    <input
                      type="file"
                      className="form-control"
                      id="floatingInput"
                      {...register("audit_leader_sign")}
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="d-flex  gap-3">
                    <label htmlFor="">Nombre:</label>

                    <input
                      type="text"
                      className="form-control border-0 border-bottom"
                      {...register("audit_leader")}
                    />
                  </div>
                  <div className="w-100 d-flex justify-content-center">
                    <p className="m-0">Auditor lider</p>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center gap-2">
                  <div>
                    <label className="fw-bold">Ingresa la firma</label>
                    <input
                      type="file"
                      className="form-control"
                      id="floatingInput"
                      {...register("represent_sign")}
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="d-flex gap-3">
                    <label htmlFor="">Nombre:</label>
                    <input
                      type="text"
                      className="form-control border-0 border-bottom"
                      {...register("represent")}
                    />
                  </div>
                  <div className="w-100 d-flex justify-content-center">
                    <p className="m-0">Representante por la dirección</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex gap-3 my-1 px-2 ">
              <button className="btn btn-success">Guardar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateFinalReport;

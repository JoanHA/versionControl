import React, { useEffect, useState } from "react";
import { getOneFinalReportView } from "../../../api/AuditAPI/final_report";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FILES_URL } from "../../../config";
function ViewFinalReport() {
  const params = useParams();
  const [report, setReport] = useState({});
  const [plan, setPlan] = useState({});
  const [inspectors, setInspectors] = useState([]);
  const [requisites, setRequisites] = useState([]);

  const bringInfo = async () => {
    try {
      const res = await getOneFinalReportView(params.id);
      console.log(res.data);
      setReport(res.data.finalReport[0]);
      setPlan(res.data.auditPlan[0]);
      setInspectors(res.data.inspectors);
      setRequisites(res.data.requisites);
    } catch (error) {}
  };

  useEffect(() => {
    bringInfo();
  }, []);

  return (
    <div className="px-4">
      <div className="titleHeader">
        <button
          className="btn align-self-start"
          onClick={() => {
            history.back();
          }}
        >
          <FaArrowCircleLeft size={20} />
        </button>
        Informe final de auditoria
      </div>

      <div>
        <div className="row border my-2 rounded">
          <div className="col-12 col-md-4  d-flex border-end border-bottom d-flex flex-column">
            <div>
              <label htmlFor="">
                <strong>Objetivo:</strong>
              </label>
            </div>
            <div>
              <p>{plan.objective}</p>
            </div>
          </div>
          <div className="col-12 col-md-4 border-end border-bottom">
            <div>
              <label htmlFor="">
                <strong>Fecha de auditoria:</strong>
              </label>
            </div>
            <div>
              <p>{plan.validity}</p>
            </div>
          </div>
          <div className="col-12 col-md-4 border-bottom">
            <div>
              <label htmlFor="">
                <strong>Hora:</strong>
              </label>
            </div>
            <div>
              <p>De acuerdo al plan de auditoria.</p>
            </div>
          </div>
          <div className="col-12 d-flex border-bottom d-flex flex-row gap-1">
            <div>
              <label htmlFor="">
                <strong>Alcance: </strong>
              </label>
            </div>
            <div>
              <p> {plan.scope}</p>
            </div>
          </div>
          <div className="col-12 d-flex border-bottom d-flex flex-row gap-1">
            <div>
              <label htmlFor="">
                <strong>Criteria:</strong>
              </label>
            </div>
            <div>
              <p>{plan.criteria}</p>
            </div>
          </div>
          <div className="col-12 row">
            <div className=" col-5 d-flex align-items-center justify-content-center border-end">
              <label htmlFor="">
                <strong>Equipo auditor:</strong>
              </label>
            </div>
            <div className="col-6">
              <ul>
                {inspectors.map((i) => (
                  <li>
                    {i.full_name} - {i.job}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-100 bg-secondary d-flex align-items-center justify-content-center rounded">
          <h3 className="py-1 text-light">Desarrollo de la auditoria</h3>
        </div>
        <div>
          <div>
            <h4 className="fw-bold">Aspectos positivos</h4>
            <div className="border p-2">
              <p>{report.positive_aspects}</p>
            </div>
          </div>
          <div>
            <h4 className="fw-bold">Aspectos a mejorar</h4>
            <div className="border p-2">
              <p>{report.negative_aspects}</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h4 className="fw-bold">Hallazgos</h4>
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Requisito</th>
                  <th>Descripción</th>
                  <th>Proceso</th>
                </tr>
              </thead>
              <tbody>
                {requisites.map((r) => (
                  <tr key={r.id}>
                    <td>{r.requisites}</td>
                    <td>{r.description}</td>
                    <td>{r.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h4 className="fw-bold">Analisis de la eficacia de la auditoria</h4>
          <div className="d-flex  flex-column gap-3">
            <div className="d-flex flex-column border p-2">
              <label>
                <strong>
                  Se cumplio el objetivo,el alcance y los criterios de la
                  auditoria?
                </strong>
              </label>
              <label >
                {report.filled_objective == 1 ? "SI" : "NO"}
              </label>
            </div>
            <div className="border p-2">
              <label>
                <strong>
                  Riesgos presentados durante la auditoria y solución dada:
                </strong>
              </label>
              <p>{report.presented_risk}</p>
            </div>
            <div className="border p-2">
            <label>
                <strong>
               Otros
                </strong>
              </label>
              <p>{report.others}</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="fw-bold">Conclusiones generales</h4>
          <div className="border p-2">
            <p>{report.conclusions}</p>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center  gap-4 py-2">
          <div className="d-flex flex-column gap-2 ">
            <img src={`${FILES_URL}signs/${report.audit_leader_sign}`} alt="Firma del auditor lider"  style={{width:"200px"}}/>
            <label htmlFor="">
              <strong>{report.audit_leader}</strong>
            </label>
            <p>Auditor lider</p>
          </div>
          <div className="d-flex flex-column gap-2 ">
            <img src={`${FILES_URL}signs/${report.represent_sign}`} alt="Firma del representante"   style={{width:"200px"}}/>
            <label htmlFor="">
              <strong>{report.represent}</strong>
            </label>
            <p>Representante por la Dirección</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFinalReport;

import React, { useEffect, useState } from "react";
import { getOneAuditPlan } from "../../../api/AuditAPI/auditPlanAPI";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import FinalReportDownload from "../../../components/auditsComponents/FinalReportDownload";
function ViewPlan() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);

  const navigate = useNavigate();
  const { setAuditPlan } = useAuth();
  const getPlan = async () => {
    const res = await getOneAuditPlan(params.id);
    const iso40 = [];
    const iso90 = [];
    const decreto0 = [];
    setData(res.data[0]);

    res.data[0]?.fields?.map((e) => {
      iso90.push(e.reqs.filter((e) => e.type === 801));
      iso40.push(e.reqs.filter((e) => e.type === 802));
      decreto0.push(e.reqs.filter((e) => e.type === 803));
    });

    setFields(res.data[0]?.fields);
  };
  useEffect(() => {
    getPlan();
  }, []);
  const saveAndnavigate = (datos, id) => {
    setAuditPlan(datos);
    navigate(`/audits/createcheck/${id}`);
  };
  return (
    <div className="">
      <div className="titleHeader">Plan de auditoria interna</div>
      <div className="d-flex  justify-content-between">
        <button
          className="btn"
          onClick={() => {
            history.back();
          }}
        >
          <FaArrowCircleLeft size={20} />
        </button>
        <FinalReportDownload  id={params.id}/>
      </div>
      <div className="px-3">
        <div className="row m-0 mb-1">
          <div className="col-12 row rows">
            <div className="col-2 first-column">
              <strong>Objectivo:</strong>
            </div>
            <div className="col-10">{data?.objective}</div>
          </div>
          <div className="col-12 row rows">
            <div className="col-2 first-column">
              <strong>Alcance:</strong>
            </div>
            <div className="col-10"> {data?.scope}</div>
          </div>
          <div className="col-12 row rows">
            <div className="col-2 first-column">
              <strong>Criterio:</strong>
            </div>
            <div className="col-10"> {data?.criteria}</div>
          </div>
          <div className="col-12 row rows">
            <div className="col-2 first-column ">
              <strong>Auditor lider:</strong>
            </div>
            <div className="col-10">{data?.leader}</div>
          </div>
          <div className="col-12 row rows">
            <div className="col-2 first-column ">
              <strong>Grupo auditor:</strong>
            </div>
            <div className="col-10">
              {data?.audit_group?.map(
                (au) => `${au.full_name} - (${au.job}). `
              )}
            </div>
          </div>

          <div className="col-12 row rows">
            <div className="col-2 first-column ">
              <strong> Riesgos:</strong>
            </div>
            <div className="col-10">
              <div className="d-flex flex-wrap gap-2">
                {data?.riskAndPlan?.length > 0 &&
                  data.riskAndPlan.map((e, index) => (
                    <p className="m-0" key={index}>
                      * {e.risk_name}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-12 row rows">
            <div className="col-2 first-column">
              <strong>Oportunidades:</strong>
            </div>
            <div className="col-10">{data?.oportunities}</div>
          </div>
          <div className="col-12 row rows">
            <div className="col-2 first-column">
              <strong>Planes de contingencia:</strong>
            </div>
            <div className="col-10">
              <div className="d-flex flex-wrap gap-2">
                {data?.riskAndPlan?.length > 0 &&
                  data.riskAndPlan.map((e, index) => (
                    <p className="m-0" key={index}>
                      * {e.plan_name}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="  table-sm table-hover table  table-striped  ">
            <thead className="table-dark">
              <tr className="text-center">
                <th>Fecha</th>
                <th>Hora</th>
                <th>Lugar</th>
                <th>Proceso</th>
                <th>ISO 9001</th>
                <th>ISO 45001</th>
                <th>Decreto 1072</th>
                <th>Auditor</th>
                <th>Auditado</th>
                <th>Recursos</th>
                <th>Información</th>
                <th>Opción</th>
              </tr>
            </thead>

            {fields &&
              fields.map((f, index) => (
                <tbody key={index}>
                  <tr className="text-center">
                    <td>{f.date}</td>
                    <td>
                      {f.init_time} - {f.end_time}
                    </td>
                    <td>{f.place}</td>
                    <td>{f.process_name}</td>
                    <td>
                      {f.reqs.map((e) =>
                        e.type === 801 ? ` *${e.article} ` : ""
                      )}
                    </td>
                    <td>
                      {f.reqs.map((e) =>
                        e.type === 802 ? ` *${e.article} ` : ""
                      )}
                    </td>
                    <td>
                      {f.reqs.map((e) =>
                        e.type === 803 ? ` *${e.article} ` : ""
                      )}
                    </td>
                    <td>
                      {f.field_inspector.length < 1
                        ? "No tiene auditor"
                        : f.field_inspector.map(
                            (e) => `- ${e.full_name} (${e.initials}) `
                          )}
                    </td>
                    <td>{f.to_audit}</td>
                    <td>{f.resources}</td>
                    <td>{f.digital_info}</td>
                    <td className=" text-center">
                      {f.check_count > 0 ? (
                        <Link
                          to={`/audits/checklist/${f.check_list_id}`}
                          className="btn btn-sm btn-warning text-center"
                        >
                          Ver lista chequeo
                        </Link>
                      ) : (
                        <button
                          className="btn btn-sm btn-warning text-center"
                          type="button"
                          onClick={() => {
                            saveAndnavigate(f, f.id);
                          }}
                        >
                          Crear lista chequeo
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewPlan;

import React, { useEffect, useState } from "react";

import { getAuditPlan } from "../../../api/AuditAPI/auditPlanAPI";


import { Link } from "react-router-dom";
function AuditPlans() {
  const columns = [
    {
      accesorKey: "created_at",
      header: "Fecha",
    },
    {
      accesorKey: "audit_group",
      header: "Equipo Auditor",
    },
    {
      accesorKey: "objective",
      header: "Objetivo",
    },
  ];
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await getAuditPlan();
      
      setData(res.data);
    } catch (error) {
      swal.fire(error.response.data, "", "");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="titleHeader">Planes de auditorias</div>
      <div className="px-4">
        <table className="table table-primary table-striped">
          <thead>
            <tr>
              <th>Vigencia</th>
              <th>Creado por</th>
              <th>Objetivo</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((e) => (
                <tr key={e.id}>
                  <td className="text-center">{e.validity.split("-")[0]}</td>
                  <td className="text-center">{e.created_by_name}</td>
                  <td style={{maxWidth:"200px"}}>{e.objective}</td>
                  <td><Link to={`/audits/plans/view/${e.id}`} className="btn btn-secondary btn-sm btn-block w-100">Ver</Link></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuditPlans;

import React, { useEffect, useState } from "react";
import { App as Calendar } from "../../components/auditsComponents/Calendar";
import { getBydate } from "../../api/AuditAPI/auditProgramsAPI";
function Dashboard() {
  const [programs,setPrograms] = useState([])
  const getDate = (date) => {
    const selectedDate = new Date(date).toISOString().split("T")[0];
    getProgramsbyDate({date: selectedDate});
  };

  const getProgramsbyDate = async (date) => {
    try {
      const res = await getBydate(date);
      setPrograms(res.data)
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    getProgramsbyDate({ date: new Date().toISOString().split("T")[0] });
  }, []);
  return (
    <div>
      <div className="dashboard-header">
        <div className="titleHeader py-2 rounded mt-1">
          <h3 style={{ fontWeight: "600" }}>Modulo de auditorias BIOART S.A</h3>
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap ">
        <div className="text-center">
          <Calendar onChange={getDate}></Calendar>
        </div>
        <div className="d-flex flex-column align-items-center flex-fill py-5 ">
          <div className="text-center">
            <h4>Auditorias programadas</h4>
          </div>
          <div style={{maxWidth:"519px"}}>
          {programs.length > 0 ? programs.map((e)=>(<div className="row">
           
            <p className="col-4"><strong>Auditor:</strong> {e.leader ?e.leader : "Ninguno" }</p>
            <p className="col-4"><strong>Lugar:</strong> {e.place}</p>
            <p className="col-4"><strong>Proceso:</strong> {e.process_name}</p>
            
            </div>)):(<p>No hay auditorias programadas para este dia</p>)}
          </div>
        </div>
      </div>
      <div>

      </div>
      <div className="d-flex p-4  justify-content-evenly flex-wrap">
        <div className="dashboard-card">
          <div className="dashboard-card-header">Proximas auditorias</div>
          <div className="dashboard-card-body"></div>
          <div className="dashboard-card-footer"></div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">Capacitaciones</div>
          <div className="dashboard-card-body"></div>
          <div className="dashboard-card-footer"></div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">Ultimas evaluaciones</div>
          <div className="dashboard-card-body"></div>
          <div className="dashboard-card-footer"></div>
        </div>
     
        <div className="dashboard-card">
          <div className="dashboard-card-header">Ultimos reportes</div>
          <div className="dashboard-card-body"></div>
          <div className="dashboard-card-footer"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

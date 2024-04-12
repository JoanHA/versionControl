import React, { useEffect, useState } from "react";
import { App as Calendar } from "../../components/auditsComponents/Calendar";
import { getBydate } from "../../api/AuditAPI/auditProgramsAPI";
function Dashboard() {
  const [programs, setPrograms] = useState([]);
  const getDate = (date) => {
    const selectedDate = new Date(date).toISOString().split("T")[0];
    getProgramsbyDate({ date: selectedDate });
  };

  const getProgramsbyDate = async (date) => {
    try {
      const res = await getBydate(date);
      setPrograms(res.data);
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
          <div style={{ maxWidth: "519px" }}>
            {programs.length > 0 ? (
              programs.map((e) => (
                <div className="row">
                  <p className="col-4">
                    <strong>Auditor:</strong> {e.leader ? e.leader : "Ninguno"}
                  </p>
                  <p className="col-4">
                    <strong>Lugar:</strong> {e.place}
                  </p>
                  <p className="col-4">
                    <strong>Proceso:</strong> {e.process_name}
                  </p>
                </div>
              ))
            ) : (
              <p>No hay auditorias programadas para este dia</p>
            )}
          </div>
        </div>
      </div>
     
    
      <div className="little-links-container row px-5 ">
        <div className="col-xl-3 col-md-6 col-sm-12">
          <div
            className="card text-bg-secondary mb-3  little-cards "
            style={{ maxWidth: "15rem",minHeight:"9rem" }}
          >
            <div className="card-header">Proximas auditorias</div>
            <div className="card-body">
              <p className="card-text">
                Programa tus proximas auditorias y traza todo el
                proceso
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-sm-12">
          <div
            className="card text-bg-light mb-3  little-cards"
            style={{ maxWidth: "15rem",minHeight:"9rem" }}
          >
            <div className="card-header">Reporte de hallazgos</div>
            <div className="card-body">
              <p className="card-text">
                Reportar  mejoras y no conformidades nunca habia
                sido tan facil
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-sm-12">
          <div
            className="card text-bg-secondary mb-3  little-cards "
            style={{ maxWidth: "15rem",minHeight:"9rem" }}
          >
            <div className="card-header">Archivos de Consulta</div>
            <div className="card-body">
              <p className="card-text">
                Todos tus archivos de consulta en un solo lugar
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 col-sm-12">
          <div
            className="card text-bg-light mb-3  little-cards flex-fill"
            style={{ maxWidth: "15rem",minHeight:"9rem" }}
          >
            <div className="card-header">Evaluaciones</div>
            <div className="card-body">
              <p className="card-text">Evaluar y calificar tus auditores de la mejor manera </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

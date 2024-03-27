import React from "react";

function Dashboard() {
  return (
    <div>
      <div className="dashboard-header">
        <div className="dashboard-background-audits rounded mt-1">
          <h3 style={{ fontWeight: "600" }}>Modulo de auditorias BIOART S.A</h3>
        </div>
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
          <div className="dashboard-card-header">Archivos de consulta</div>
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

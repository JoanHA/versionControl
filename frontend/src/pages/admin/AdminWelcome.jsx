import React, { useEffect, useState } from "react";
import "../../assets/CSS/dashboard.css";
import { useAuth } from "../../context/AuthContext";
import adminLogo from "../../assets/IMG/admin.jpg";
import { Link } from "react-router-dom";
import { LastModified, MostModified } from "../../api/parameters";
import ReactTimeAgo from "react-time-ago";
function AdminWelcome() {
  const [most, setMost] = useState([]);
  const [last, setLast] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const lastModifiedRes = await LastModified();
      const mostModifiedRes = await MostModified();
      var color = "green";
      const modified = mostModifiedRes.data.map((m) => {
        m.color = color;
        color = color === "green" ? "blue" : "green";
        return m;
      });

      setMost(modified);
      const last = lastModifiedRes.data.map((m) => {
        m.color = color;
        color = color === "green" ? "blue" : "green";
        return m;
      });
      setLast(last);
    };
    getData();
  }, []);
  return (
    <div>
      <header className="dashboard-header">
        <div className="dashboard-background">
          <h3 style={{ color: "white", fontWeight: "700" }}>Dashboard</h3>
          <p style={{ color: "white", fontWeight: "500" }}>
            Aqui podras, agregar editar y eliminar los usuarios que tienen
            permisos de administrador, tus tipos de documentos , procesos y
            tipologias que manejas{" "}
          </p>
        </div>
      </header>
      <div className="main-content d-flex  flex-column  flex-wrap align-items-center justify-content-center">
        {/* Icons container */}
        <div className="icons-container d-flex justify-content-center align-items-center ">
          <div className="row px-4 card-container">
            <div className="col-xl-4 col-md-6 col-sm-12  p-4 ">
              <div className="card mb-3 big-cards shadow">
                <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="card-text">
                    <p className="cardTitle">
                      Bienvenida al modulo de administración
                    </p>
                  </div>
                  <div>
                    <img
                      src={adminLogo}
                      alt="Mujer en escritorio from Freepik"
                      width={200}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6   col-sm-12 p-4 ">
              <div className="card  mb-3 big-cards shadow ">
                <div className="card-header cardTitle text-center">
                  Ultimos modificados
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {last ? (
                      <div className="d-flex gap-4 flex-column  ">
                        {last.map((e) => (
                          <>
                            <div
                              key={e.code}
                              className="d-flex gap-2 align-items-center "
                            >
                              <div className="time-line">
                                <ReactTimeAgo
                                  date={e.updated_at}
                                  locale="en-US"
                                  timeStyle="twitter"
                                />
                              </div>
                              <div
                                className="time-marker"
                                style={{ backgroundColor: `${e.color}` }}
                              ></div>
                              <div className="document-code">
                                {" "}
                                Documento {e.code}
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6   col-sm-12 p-4  ">
              <div className="card mb-3 big-cards shadow">
                <div className="card-header text-center cardTitle">
                  Lo mas modificado
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-2">
                    {most
                      ? most.map((e) => (
                          <>
                            <div key={e.code}>
                              <div className="d-flex flex-row justify-content-between align-items-center">
                                <label className="code-label">{e.code}</label>
                                <label className="qty-label">
                                  {" "}
                                  Cambios {e.count}
                                </label>
                              </div>
                              <div
                                className="progress"
                                role="progressbar"
                                aria-label="basic example"
                                aria-valuenow="0"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <div
                                  className="progress-bar"
                                  style={{
                                    width: `${e.count}0%`,
                                    background: `${e.color}`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Litle card container */}
        <div className="little-links-container row px-3 ">
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div
              className="card text-bg-primary mb-3  little-cards "
              style={{ maxWidth: "15rem" }}
            >
              <div className="card-header">Dashboard</div>
              <div className="card-body">
                <p className="card-text" style={{ color: "black" }}>
                  Aqui podras manejar todo de tu plataforma
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div
              className="card text-bg-warning mb-3  little-cards"
              style={{ maxWidth: "15rem" }}
            >
              <div className="card-header">Usuarios</div>
              <div className="card-body">
                <p className="card-text">
                  Puedes agregar, editar y borrar usuarios
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div
              className="card text-bg-success mb-3  little-cards "
              style={{ maxWidth: "15rem" }}
            >
              <div className="card-header">Parametros</div>
              <div className="card-body">
                <p className="card-text" style={{ color: "black" }}>
                  Agregar, editar y eliminar tipos de documentos
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div
              className="card text-bg-info mb-3  little-cards flex-fill"
              style={{ maxWidth: "15rem" }}
            >
              <div className="card-header">Listado de documentos</div>
              <div className="card-body">
                <p className="card-text">Sigue manejando tus documentos </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminWelcome;

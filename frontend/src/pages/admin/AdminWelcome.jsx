import React, { useEffect } from "react";
import "../../assets/CSS/dashboard.css";
import { useAuth } from "../../context/AuthContext";
function AdminWelcome() {
  const {user} =useAuth()
  useEffect(()=>{console.log(user)},[])
  return (
    <div> 
      <header className="dashboard-header">
        <div className="dashboard-background">
          <h3>Dashboard</h3>
        </div>
      </header>
      <div className="main-content d-flex  flex-column  flex-wrap align-items-center justify-content-center">
        {/* Icons container */}
        <div className="icons-container d-flex justify-content-center align-items-center ">

          <div className="row px-4">
            <div className="col-xl-4 col-md-6 col-sm-12 mb-4">
              <div className="card mb-3 big-cards shadow">
                <div className="card-body">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4  col-sm-12">
              <div className="card  mb-3 big-cards shadow ">
                <div className="card-body">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4  col-sm-12">
              <div className="card mb-3 big-cards ">
                <div className="card-body">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Litle card container */}
        <div className="little-links-container row px-3">
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div
              className="card text-bg-primary mb-3  little-cards "
              style={{ maxWidth: "15rem" }}
            >
              <div className="card-header">Dashboard</div>
              <div className="card-body">
                <h5 className="card-title">Primary card title</h5>
                <p className="card-text">Some quick example</p>
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
                <h5 className="card-title">Secondary card title</h5>
                <p className="card-text">Some quick example</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div
              className="card text-bg-success mb-3  little-cards"
              style={{ maxWidth: "15rem" }}
            >
              <div className="card-header">Parametros</div>
              <div className="card-body">
                <h5 className="card-title">Success card title</h5>
                <p className="card-text">Some quick example</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div
              className="card text-bg-dark mb-3  little-cards"
              style={{ maxWidth: "15rem" }}
            >
              <div className="card-header">Listado de documentos</div>
              <div className="card-body">
                <h5 className="card-title">Danger card title</h5>
                <p className="card-text">Some quick example</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminWelcome;

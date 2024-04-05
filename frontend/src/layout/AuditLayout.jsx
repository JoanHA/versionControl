import React from "react";
import AuditSidebar from "../components/auditsComponents/auditSidebar";
import logo from "../assets/IMG/grupo-carval-Logo-Bioart.png";
import { Link } from "react-router-dom";
import "../assets/CSS/audits.css";
function AuditLayout({ children }) {
  return (
    <div className="d-flex flex-column ">
      <header className="">
        <nav className="navbar navbar-expand-lg  bg-body-tertiary">
          <div className="container-fluid">
            <div className="d-flex align-items-center pt-1 me-2">
              <Link to={"/"}>
                <img src={logo} alt="Logo de Bioart" width={190} height={40} />
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul
                id="ul"
                className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll "
              >
                <li className="nav-item nav-link p-1">
                  <Link to="/admin" className="nav-link">
                    Administrador
                  </Link>
                </li>
                <li className="nav-item nav-link p-1">
                  <Link to={"/docs"} className="nav-link">
                    Control documental
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div
        className="d-flex flex-row relative flex-fill flex-grow-1 h-100 flex-shrink-1"
        style={{ overflowX: "hidden", overflowY: "hidden" }}
      >
        <AuditSidebar></AuditSidebar>
        <div className="flex-fill ">
          <div id="childrenContainer">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AuditLayout;

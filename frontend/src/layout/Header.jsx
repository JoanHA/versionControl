import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const Header = ({ children }) => {
  return (
    <div className="d-flex flex-column ">
      <header className=""  id="navHeader">
        <nav className="navbar navbar-expand-lg  bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Control de documentos
            </a>
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
                  <a href="#" className="nav-link">
                    Iniciar sesion
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="px-2 py-2  d-flex flex-row">
        <Sidebar></Sidebar>
        <div style={{width:"90%"}}>{children}</div>
      </div>
    </div>
  );
};

export default Header;

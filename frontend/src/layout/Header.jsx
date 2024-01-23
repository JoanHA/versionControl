import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import logo from "../assets/IMG/grupo-carval-Logo-Bioart.png";
const Header = ({ children }) => {
  return (
    <div className="d-flex flex-column ">
      <header className="" id="navHeader">
        <nav className="navbar navbar-expand-lg  bg-body-tertiary">
          <div className="container-fluid">
            <div className="d-flex align-items-center pt-1 me-2">
              <img src={logo} alt="Logo de Bioart" width={190} height={40} />
            </div>
            {/* <Link className="navbar-brand" to="/">
            Control de documentos
            </Link> */}
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
                  <Link to="/login" className="nav-link">
                    Iniciar sesion
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="px-2 py-2  d-flex flex-row ">
        <Sidebar></Sidebar>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
};

export default Header;

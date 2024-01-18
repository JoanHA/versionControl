import React from "react";
import { Link } from "react-router-dom";
const Header = ({ children }) => {
  return (
    <div className="d-flex flex-column ">
      <header className="">
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
                {/* <ul className="dropdown nav-item nav-link p-1 "> */}
                  {/* <li className="dropbtn nav-link liClicked">Listado maestro</li>
                  <div className="dropdown-content">
                    <a href="#">Registrar documento</a>
                    <a href="#"> Ver documentos</a>
                  </div>
                </ul>

                <li className="nav-item nav-link p-1 ">
                  <a className="nav-link liClicked">Control de cambios</a>
                </li>
                <li className="nav-item nav-link  p-1">
                  <a className="nav-link  liClicked">
                    Retención documental
                  </a>
                </li> */}

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

      <div className="px-2 py-2">
        {children}
      </div>
    </div>
  );
};

export default Header;

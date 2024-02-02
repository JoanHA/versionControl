import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import logo from "../assets/IMG/grupo-carval-Logo-Bioart.png";
import { useAuth } from "../context/AuthContext";
const Header = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="d-flex flex-column ">
      <header className="" id="navHeader">
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
                {isAuthenticated ? (
                  <>
                    <li className="nav-item nav-link p-1">
                      <Link to="/admin" className="nav-link">
                        Administrador
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {" "}
                    <li className="nav-item nav-link p-1">
                      <Link to="/login" className="nav-link">
                        Iniciar sesion
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item dropdown">
                  <button
                    className="headerLinks dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Maestro documental
                  </button>
                  <ul className="dropdown-menu ">
                    <li>
                      <Link to={"/"} className="dropdown-item">
                        Ver listado
                      </Link>
                    </li>
                    {isAuthenticated && (
                      <li>
                        <Link to={"/newDoc"} className="dropdown-item">
                          Agregar documento
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="headerLinks dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Control de cambios
                  </button>
                  <ul className="dropdown-menu ">
                    <li>
                      <Link to={"/changes"} className="dropdown-item">
                        Ver cambios
                      </Link>
                    </li>
                    {isAuthenticated && (
                      <li>
                        <Link to={"/createChange"} className="dropdown-item">
                          Agregar cambio a documento
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="headerLinks dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Retención documental
                  </button>
                  <ul className="dropdown-menu ">
                    <li>
                      <Link to={"/external"} className="dropdown-item">
                         Documentos externos
                      </Link>
                    </li>
                    {isAuthenticated && (
                      <>
                        <li>
                          <Link to={"/createExternal"} className="dropdown-item">
                            Agregar documento externo
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                  
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className=" d-flex flex-row ">
        <Sidebar></Sidebar>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
};

export default Header;

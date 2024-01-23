import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div id="sidebar" className="">
      <div className="list-group px-1">
        <div className="dropdown">
          <button
            type="button"
            className="list-group-item list-group-item-action dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Link to={"/"}> Maestro documental</Link>
          </button>
          <ul className="dropdown-menu">
          <li>
              <Link className="dropdown-item" to="/">
                Ver listado maestro
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/newDoc">
                Crear documento
              </Link>
            </li>
           
          </ul>
        </div>

        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          <Link to={"/changes"}>Control de cambios </Link>
        </button>
        <div className="dropdown">
          <button
            type="button"
            className="list-group-item list-group-item-action dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Link to={"/control"}>Retención documental </Link>
          </button>
          <ul className="dropdown-menu">
          <li>
              <Link className="dropdown-item" to="/control">
                 Retencion documental
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/createControl">
                Crear control documental
              </Link>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

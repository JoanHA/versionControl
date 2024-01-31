import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Sidebar() {
  const history = useLocation();
  const [pathname, setPathname] = useState(history.pathname);

  useEffect(() => {
    setPathname(history.pathname);
  }, [history]);

  window.addEventListener("resize", () => {
    if (innerWidth <= 1181) {
      if (
        pathname.split("/")[1] != "admin" &&
        pathname.split("/")[1] != "editUser"
      ) {
        document.querySelector("#navHeader")?.classList?.add("navClose");
        console.log("true");
      } else {
        document.querySelector("#navHeader")?.classList?.remove("navClose");
        document.querySelector("#navHeader")?.classList?.add("navOpen");
      }
    }
  });
  const classNameRender = () => {
    if (
      pathname === "/welcome" ||
      pathname === "/login" ||
      pathname === "/admin" ||
      pathname === "/admin/users" ||
      pathname === "/admin/parameters" ||
      pathname === "/admin/newUser" ||
      pathname.split("/")[1] === "editUser"
    ) {
      return "d-none";
    }
    return "";
  };
  const { isAuthenticated } = useAuth();
  return (
    <div id="sidebar" className={classNameRender()}>
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
            {isAuthenticated && (
              <li>
                <Link className="dropdown-item" to="/newDoc">
                  Crear documento
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="dropdown">
          <button
            type="button"
            className="list-group-item list-group-item-action dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Link to={"/changes"}>Control de cambios </Link>
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/changes">
                Ver cambios
              </Link>
            </li>

            {isAuthenticated && (
              <li>
                <Link className="dropdown-item" to="/createChange">
                  Crear cambio a documento
                </Link>
              </li>
            )}
          </ul>
        </div>

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
            {isAuthenticated && (
              <li>
                <Link className="dropdown-item" to="/createControl">
                  Crear control documental
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

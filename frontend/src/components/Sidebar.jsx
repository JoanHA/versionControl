import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Sidebar() {
  // const history = useLocation();
  // const [pathname, setPathname] = useState(history.pathname);

  // useEffect(() => {
  //   setPathname(history.pathname);
  //   changeSize();
  // }, [history]);

  // const changeSize = () => {
  //   if (window.outerWidth <= 1271) {
  //     if (
  //       pathname.split("/")[1] != "admin" &&
  //       pathname.split("/")[1] != "editUser"
  //     ) {
  //       console.log("cambia");
  //       document.querySelector("#navHeader")?.classList?.add("navClose");
  //       return;
  //     } else {
  //       document.querySelector("#navHeader")?.classList?.remove("navClose");
  //       document.querySelector("#navHeader")?.classList?.remove("navOpen");
  //       return;
  //     }
  //   }
  //   if (
  //     pathname.split("/")[1] != "admin" &&
  //     pathname.split("/")[1] != "editUser"
  //   ) {
  //     document.querySelector("#navHeader")?.classList?.add("navClose");
  //   } else {
  //     document.querySelector("#navHeader")?.classList?.remove("navClose");
  //     return;
  //   }
  // };
  // window.addEventListener("resize", () => {
  //   changeSize();
  // });
 
 
  const { isAuthenticated } = useAuth();
  return (
    <div id="sidebar" >
      <div className="list-group px-1">
        {isAuthenticated ? (
          <>
            <div className="dropdown">
              <button
                type="button"
                className="list-group-item list-group-item-action dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Link to={"/docs"}> Listado maestro</Link>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/docs">
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

                <li>
                  <Link className="dropdown-item" to="/createChange">
                    Crear cambio a documento
                  </Link>
                </li>
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

                <li>
                  <Link className="dropdown-item" to="/createControl">
                    Crear control documental
                  </Link>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <button
                type="button"
                className="list-group-item list-group-item-action dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Link>Documentos externos </Link>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/external">
                    Documentos externos
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/createExternal">
                    Agregar documento externo
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="list-group">
              <Link
                to="/docs"
                className="list-group-item list-group-item-action "
                aria-current="true"
              >
                Ver listado maestro
              </Link>

              <Link
                to="/external"
                className="list-group-item list-group-item-action"
              >
                Documentos externos
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;

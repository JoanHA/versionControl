import React, { useEffect, useState } from "react";
import { getInformation } from "../../api/changes";
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function Archived({ doc, text, external }) {
  const [info, setInfo] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const [id, setId] = useState("");
  const { isAuthenticated, user } = useAuth();

  //This is for getting the data aboout where it's archived
  const getInfo = async () => {
    try {
      if (!doc) {
        return setIsEmpty(true);
      }

      if (doc.code) {
        const res = await getInformation(doc.code);
        if (res.data.status === 404) {
          return setIsEmpty(true);
        }
        return setInfo(res.data[0]);
      }
      setInfo(doc);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInfo();
    setId(uniqid());
  }, []);
  const onClick = () => {
    //Cerrar modal
    document.getElementById(id).classList.add("d-none");
    document.getElementById(id).style.display = "none";
    document.getElementById(id).style.opacity = 0;
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sm mt-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => {
          document.getElementById(id).classList.remove("d-none");
          document.getElementById(id).style.display = "block";
          document.getElementById(id).style.opacity = 1;
        }}
      >
        {text ? text : "Ver donde se archiva"}
      </button>

      <div
        className="modal  d-none fade modalBack  d-flex align-items-center justify-content-center" //modal fade
        id={id} //exampleModal
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "800px" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <strong>Documento {doc.code ? doc.code : "Externo"}</strong>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClick}
              ></button>
            </div>
            <div className="modal-body">
              {isEmpty ? (
                <div>
                  <h2>
                    <strong>
                      Este documento aun no tiene lugar de archivo
                    </strong>
                  </h2>
                </div>
              ) : (
                <div className="row">
                  <div className="col-6 d-flex flex-column">
                    <label>
                      <strong>Nombre del documento</strong>
                    </label>
                    <label htmlFor="">
                      {doc.name ? doc.name : doc.documentName}
                    </label>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <label>
                      <strong>Responsable</strong>
                    </label>
                    <label htmlFor="">
                      {info.responsible ? info.responsible : ""}
                    </label>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <label>
                      <strong>Donde se archiva</strong>
                    </label>
                    <label htmlFor="">{info.saved_in}</label>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <label>
                      <strong>Como se archiva</strong>
                    </label>
                    <label htmlFor="">{info.saved_format}</label>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <label>
                      <strong>Tiempo de retención</strong>
                    </label>
                    <div>
                      <div
                        className="d-flex flex-row gap-2
                      "
                      >
                        <label htmlFor="">
                          <strong>Activo: </strong>
                        </label>
                        <label htmlFor="">{info.actived_saved}</label>
                      </div>
                      <div className="d-flex flex-row gap-2">
                        <label htmlFor="">
                          <strong>Inactivo: </strong>
                        </label>
                        <label htmlFor="">{info.inactived_saved}</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <label>
                      <strong>Disposición final</strong>
                    </label>
                    <label htmlFor="">{info.last_move_name}</label>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {isAuthenticated && user.rol === 1 ? (
                <Link
                  className="btn btn-warning"
                  to={
                    external
                      ? `/createExternal/edit/${info.id}`
                      : `/createControl/edit/${info.id}`
                  }
                >
                  Editar
                </Link>
              ) : (
                ""
              )}

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClick}
              >
                Cerrar
              </button>
              {/* <button type="button" className="btn btn-primary">
                Save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Archived;

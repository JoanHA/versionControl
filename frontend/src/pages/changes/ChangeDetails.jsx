import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import { formatTimeStamp } from "../../lib/helper";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function ChangeDetails({ infor }) {
  const [info, setInfo] = useState({});

  const [id, setId] = useState("");
  const { isAuthenticated, user } = useAuth();
  useEffect(() => {
    setInfo(infor);
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
        onClick={() => {
          document.getElementById(id).classList.remove("d-none");
          document.getElementById(id).style.display = "block";
          document.getElementById(id).style.opacity = 1;
        }}
      >
        Detalles
      </button>

      <div
        className="modal  d-none fade modalBack  d-flex align-items-center justify-content-center" //modal fade
        id={id} //exampleModal
        tabIndex="-1"
      >
        <div
          className="modal-dialog   modal-dialog-scrollable"
          style={{ maxWidth: "670px" }}
        >
          <div className="modal-content mt-5">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <strong>Cambio al documento {info.code}</strong>
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={onClick}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row ">
                <div className="col-6 d-flex flex-column my-1">
                  <label>
                    <strong>Nombre del documento</strong>
                  </label>
                  <label htmlFor="">{info.name}</label>
                </div>
                <div className="col-6 d-flex flex-column">
                  <label>
                    <strong>Solicitante</strong>
                  </label>
                  <label htmlFor="">{info.claimant}</label>
                </div>
                <div className="col-6 d-flex flex-column my-1">
                  <label>
                    <strong>Justificación</strong>
                  </label>
                  <label htmlFor="">{info.reason}</label>
                </div>
                <div className="col-6 d-flex flex-column">
                  <label>
                    <strong>Nueva versión</strong>
                  </label>
                  <label htmlFor="">{info.new_version}</label>
                </div>
                <div className="my-1 col-6 d-flex flex-column">
                  <label>
                    <strong>Aprueba</strong>
                  </label>
                  <label htmlFor="">{info.aproved_by}</label>
                </div>
                <div className="col-6 d-flex flex-column">
                  <label>
                    <strong>Realizado el:</strong>
                  </label>
                  <label htmlFor="">{formatTimeStamp(info.created_at)}</label>
                </div>
                <div className="col-6 d-flex flex-column">
                  <label>
                    <strong>Detalles</strong>
                  </label>
                  <label htmlFor="">{info.details}</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {
                isAuthenticated && user.rol===1 ?(
                  <Link
                  className="btn btn-warning"
                  to={`/createChange/edit/${info.id}`}
                >
                  Editar
                </Link>
                ):""
              }
            
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClick}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeDetails;

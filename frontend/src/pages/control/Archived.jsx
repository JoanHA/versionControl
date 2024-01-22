import React, { useEffect, useState } from "react";
import { getInformation } from "../../api/changes";

function Archived({ doc }) {
  const [info, setInfo] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const getInfo = async () => {
    try {
      const res = await getInformation(doc.code);
      console.log(res)
      setInfo(res.data[0])
      if (res.data.status === 404) {
       return setIsEmpty(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sm mt-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Ver donde se archiva
      </button>

      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
               
              <strong>Documento {doc.code}</strong>  
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {isEmpty ? (
                <div>
                  <h2> <strong>Este documento aun no tiene lugar de archivo</strong></h2>
                </div>
              ) : (
                <div className="row">
                  <div className="col-6 d-flex flex-column">
                    <label>
                      <strong>Nombre del documento</strong>
                    </label>
                    <label htmlFor="">{doc.name}</label>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <label>
                      <strong>Responsable</strong>
                    </label>
                    <label htmlFor="">{info.responsible}</label>
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
                      <div className="d-flex flex-row gap-2
                      ">
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
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
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

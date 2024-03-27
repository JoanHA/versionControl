import React, { useEffect, useState } from "react";
import { getOneInspector } from "../../../api/AuditAPI/inspectorsAPI";
import Table from "../../../components/Table";

const FilesView = ({ files }) => {
  const [file, setFile] = useState(files);
  const colums = [
    {
      header: "Nombre",
      accessorKey: "original_name",
    },
    {
      header: "Tipo de archivo",
      accessorKey: "file_type",
    },
    {
      header: "Fecha de subida",
      accessorKey: "created_at",
    },
  ];
  useEffect(() => {
    setFile(files);
    
  }, [files]);
  return (
    <div className="" id="list-container">
      <div id="file-list-container">
        <div
          className="d-flex flex-row justify-content-between"
          id="list-title"
        >
          <p className="m-0">Lista de certificados</p>
          <button
            className="btn btn-close"
            onClick={() => {
              document.querySelector("#list-container").style.display = "none";
            }}
          ></button>
        </div>
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          <Table columns={colums} data={file}></Table>
        </div>
      </div>
    </div>
  );
};
function ViewInspector({ display, id, close }) {
  const [status, setStatus] = useState(display);
  const [user, setUser] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setStatus(display);
  }, [display]);
  const getInspector = async () => {
    try {
      const res = await getOneInspector(id);
      setUser(res.data.user);
      setFiles(res.data.files);
    } catch (error) {
      console.log(error);
      swal.fire(
        `Lo sentimos tuvimos un error: ${error.response.data}`,
        "",
        "error"
      );
    }
  };
  useEffect(() => {
    getInspector();
  }, [id]);

  return (
    <div
      id="inspector-back"
      className={`w-100 h-100 d-${status} justify-content-center`}
    >
      <FilesView files={files} />

      <div id="inspectors-container">
        <div>
          <div
            className="d-flex  justify-content-between align-items center"
            id="inspector-info"
          >
            <p className="m-0">Informacion del auditor</p>
            <div>
              <button
                className="btn btn-close"
                onClick={() => {
                  close();
                }}
              ></button>
            </div>
          </div>
          <label>
            {" "}
            <strong> Nombre completo:</strong> {user?.full_name}{" "}
          </label>
        </div>
        <div>
          <label>
            <strong>Cargo:</strong> {user?.job}{" "}
          </label>
        </div>
        <div>
          <label>
            <strong>Fecha de ingreso:</strong>{" "}
            {user?.enroll_date?.split("T")[0]}
          </label>
        </div>
        <div>
          <label>
            <strong>Estado:</strong>{" "}
            {user?.status === 1 ? "Activo" : "Inactivo"}
          </label>
        </div>
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <label>
            <strong>Certificados</strong>
          </label>
          <div>
            <button
              className="btn btn-dark btn-sm"
              onClick={() => {
                document.querySelector("#list-container").style.display =
                  "flex";
              }}
            >
              Ver documentos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewInspector;

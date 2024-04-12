import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getFiles, deleteFile } from "../../../api/AuditAPI/process";
import { FILES_URL } from "../../../config";
function Files() {
  const [datos, setDatos] = useState([]);
  const bringdata = async () => {
    try {
      const res = await getFiles();
      console.log(res.data);
      setDatos(res.data);
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  const deleteFiles = async (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteFile(id);
          Swal.fire({
            title: res.data,
            text: "Tu archivo ha sido eliminado.",
            icon: "success",
          }).then(() => {
            bringdata();
          });
        } catch (error) {
          console.log(error);
          swal.fire(error.response.data, "", "error");
        }
      }
    });
  };
  useEffect(() => {
    bringdata();
  }, []);
  return (
    <div className="px-2">
      <div className="titleHeader">Archivos de consulta</div>
      <div>
        <div className="px-3">
          <Link to="/audits/programs">
            <FaArrowCircleLeft size={20} />
          </Link>
        </div>
      </div>

      <div>
        <div className="table-responsive">
          <Link className="my-2" to={"/audits/createFiles"}>
            <button className="btn btn-primary my-2">
              Subir nuevo archivo
            </button>
          </Link>
          <table className="table table-hover table-striped table-light">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>

                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.length > 0 ? (
                datos.map((d) => (
                  <tr key={d.id}>
                    <td className="text-center w-25">{d.original_name}</td>
                    <td className="text-center">{d.file_type}</td>
                    <td className="w-25 text-center">
                      <a
                        href={`${FILES_URL}files/${d.file_name}`}
                        className="btn btn-primary mx-1"
                      >
                        Descargar
                      </a>
                      <button
                        className="btn btn-danger mx-1"
                        type="button"
                        onClick={() => {
                          deleteFiles(d.id);
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No hay archivos de consulta...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Files;

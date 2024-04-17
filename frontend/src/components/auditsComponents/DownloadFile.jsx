import React, { useEffect } from "react";
import { FILES_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { deleteFile } from "../../api/AuditAPI/process";
function DownloadFile({ file, index }) {
const navigate =useNavigate()
  const deleteFiles = async (id) => {
    try {
      const res = await deleteFile(id);
      console.log(res)
      swal.fire("Archivo eliminado con exito!","","success").then(()=>{navigate(0)});
    } catch (error) {
      swal.fire("No pudimos eliminar el archivo, intenta mas tarde","","error");

    }
  };
  return (
    <td className="">
      <a
        className="btn btn-dark btn-sm"
        href={`${FILES_URL}/uploads/documents/${
          file[parseInt(index)].file_name
        }`}
      >
        Descargar
      </a>
      <button
        className="btn btn-danger btn-sm px-3"
        onClick={() => {
          deleteFiles(file[parseInt(index)].id);
        }}
      >
        Eliminar
      </button>
    </td>
  );
}

export default DownloadFile;

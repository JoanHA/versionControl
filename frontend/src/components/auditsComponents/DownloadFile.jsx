import React, { useEffect } from "react";
import { FILES_URL } from "../../config";
import { Link } from "react-router-dom";
function DownloadFile({ file }) {
  return (
    <td>
      <a
        className="btn btn-dark"
        href={`${FILES_URL}/uploads/documents/${file[0].file_name}`}
      >
        Descargar
      </a>
    </td>
  );
}

export default DownloadFile;

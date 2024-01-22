import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getOneDocument } from "../api/documentsAPI";
import { Link } from "react-router-dom";
import Archived from "./control/Archived";

import HistoricTable from "../components/HistoricTable";
import { getChangesFromOne } from "../api/changes";
function ViewDocument() {
  const params = useParams();
  const [isRegister, setIsRegister] = useState(false);

  const [data, setData] = useState({});
  const [changes, setChanges] = useState([]);
  const getData = async () => {
    const res = await getOneDocument(params.id);
    const changeResponse = await getChangesFromOne(res.data[0].code);
    setChanges(changeResponse.data);
    setData(res.data[0]);
    const code = res.data[0].code;
    if (code.substring(0, 1).toUpperCase() === "R") {
      setIsRegister(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      header: "Justificación",
      accessorKey: "reason",
    },
    {
      header: "Solicitante",
      accessorKey: "claimant",
    },
    {
      header: "Nueva version",
      accessorKey: "new_version",
    },
    {
      header: "Aprobado por",
      accessorKey: "aproved_by",
    },
    {
      header: "Detalles",
      accessorKey: "details",
    },
  ];

  return (
    <div>
      <div className="w-100 d-flex justify-content-end"> <button type="button" onClick={()=>{history.back()}} className="btn btn-dark mb-2 rounded btn-sm">Volver</button>
      </div>
      <div className="titleHeader text-center py-1">
        Información del archivo {data.code}
      </div>

      <div className="container mx-auto row gap-2">
        <div className="col-12 col-md-5">
          <label className="titleLabel">Código:</label>
          <label className="inputLabel">{data.code}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Nombre del documento:</label>
          <label className="inputLabel">{data.name}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Tipologia:</label>
          <label className="inputLabel">{data.typology_name}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Proceso:</label>
          <label className="inputLabel">{data.process_name}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Versión:</label>
          <label className="inputLabel">
            {data.version >= 10 ? data.version : `0${data.version}`}
          </label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Ultima revisión:</label>
          <label className="inputLabel">{data.last_revision}</label>
        </div>
        <div className="col-12 col-md-10">
          <label className="titleLabel">Detalle:</label>
          <label className="inputLabel">{data.comments}</label>
        </div>
        <div>
          <Link className="btn btn-sm btn-warning mt-2 mx-1">
            Editar archivo
          </Link>

          {isRegister && (
            <>
              <Archived doc={data.code ? data : null} />
              <Link to={"/createControl/"+data.code} className="btn btn-success mx-1  btn-sm mt-2">Agregar control de archivo</Link>
            </>
          )}
        </div>
      </div>
      <div className="titleHeader text-center py-1 mt-3">
        {" "}
        Historico de cambios del {data.code}
      </div>

      <div className="px-5">
        <Link className="btn btn-sm btn-primary mb-2 " to={"/createChange"}>
          Agregar cambio
        </Link>
        <HistoricTable
          className="px-4"
          columns={columns}
          data={changes}
        ></HistoricTable>
      </div>
    </div>
  );
}

export default ViewDocument;

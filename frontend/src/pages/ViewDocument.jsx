import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneDocument } from "../api/documentsAPI";
import { Link } from "react-router-dom";
import Archived from "./control/Archived";

import HistoricTable from "../components/HistoricTable";
import { getChangesFromOne } from "../api/changes";
import { useAuth } from "../context/AuthContext";
function ViewDocument() {
  const params = useParams();
  const [isRegister, setIsRegister] = useState(false);

  const [data, setData] = useState({});
  const [changes, setChanges] = useState([]);

  const { isAuthenticated } = useAuth();
  const getData = async () => {
    const res = await getOneDocument(params.id); //Informacion del documento
    const changeResponse = await getChangesFromOne(res.data[0].code); // Cambios que tiene el equipo

    //Agregarle el 0 a la version del equipo
    const datos = changeResponse.data.map((element) => {
      const e = { ...element };
      e.new_version = e.new_version < 10 ? `0${e.new_version}` : e.new_version;
      return e;
    });

    //Guardar los datos
    setChanges(datos);
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
      <div className="w-100 d-flex align-items-center gap-2 flex-wrap my-1">
     
        <button
          type="button"
          onClick={() => {
            history.back();
          }}
          className="btn btn-dark rounded btn-sm"
        >
          Volver
        </button>
        {isAuthenticated && (
          <Link className="btn btn-sm btn-primary  " to={"/createChange"}>
            Agregar cambio
          </Link>
        )}
        {data.link && (
          <a
            href={data.link}
            target="blank"
            className="btn btn-secondary btn-sm "
          >
            Ver en sharepoint
          </a>
        )}
        {isAuthenticated && (
          <>
            <Link
              to={"/edit/" + data.id}
              className="btn btn-sm btn-warning "
            >
              Editar archivo
            </Link>

            {isRegister && (
              <>
              <div className="" style={{marginBottom:"5px"}}>
                <Archived doc={data.code ? data : null} />

              </div>
                <Link
                  to={"/createControl/" + data.code}
                  className="btn btn-success mx-1  btn-sm "
                >
                  Agregar control de archivo
                </Link>
              </>
            )}
          </>
        )}
      </div>
      <div className="titleHeader text-center py-1">
        Información del documento {data.code}
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
          <label className="titleLabel">
            Fecha de emisión / Ultima revisión:
          </label>
          <label className="inputLabel">{data.last_revision}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Observaciones:</label>
          <label className="inputLabel">{data.comments}</label>
        </div>
        <div className="col-12 col-md-4 ">
          <label className="titleLabel">Link de sharePoint:</label>

          <label className="inputLabel">
            <a href={data.link} target="blank">
              VISITAR LINK
            </a>
          </label>
        </div>
      </div>
      <div className="titleHeader text-center py-1 mt-3">
        {" "}
        Historico de cambios del {data.code}
      </div>

      <div className="px-3">
        <HistoricTable
          columns={columns}
          data={changes}
          info={data}
        ></HistoricTable>
      </div>
    </div>
  );
}

export default ViewDocument;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDocuments, getOneDocument } from "../api/documentsAPI";
import { Link } from "react-router-dom";
import Archived from "./control/Archived";

import HistoricTable from "../components/HistoricTable";
import { getChangesFromOne } from "../api/changes";
import { useAuth } from "../context/AuthContext";
import { formatTimeStamp } from "../lib/helper";
function ViewDocument() {
  const [isRegister, setIsRegister] = useState(false);
  const [data, setData] = useState({});
  const [changes, setChanges] = useState([]);
  const { isAuthenticated, user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
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
  const getData = async () => {
    const res = await getOneDocument(params.id);
    //Informacion del documento

    const changeResponse = await getChangesFromOne(res.data[0].code); // Cambios que tiene el equipo

    //Agregarle el 0 a la version del equipo
    const datos = changeResponse.data.map((element) => {
      const e = { ...element };
      e.new_version =
        e.new_version < 10
          ? e.new_version === 0
            ? "OBSOLETO"
            : `0${e.new_version}`
          : e.new_version;
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

  const deleteDocument = () => {
    Swal.fire({
      title: "Estas seguro de esta acción?",
      text: "No serás capaz de revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, hazlo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteDocuments(params.id);
          swal.fire(res.data, "", "success").then(() => {
            navigate("/");
          });
        } catch (error) {
          swal.fire(error.response.data, "", "error");
        }
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="w-100 d-flex align-items-center gap-2 flex-wrap my-1">
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-dark rounded btn-sm"
        >
          Volver
        </button>

        <>
          {user?.rol === 1 && isAuthenticated ? (
            <button className="btn btn-danger btn-sm" onClick={deleteDocument}>
              Eliminar documento
            </button>
          ) : (
            ""
          )}

          {isAuthenticated && data.status === 1 ? (
            <Link
              className="btn btn-sm btn-primary  "
              to={"/createChange/" + data.code}
            >
              Agregar cambio
            </Link>
          ) : (
            ""
          )}

          {isAuthenticated && data.status === 1 ? (
            <>
              <Link to={"/edit/" + data.id} className="btn btn-sm btn-warning ">
                Editar archivo
              </Link>

              {isRegister && data.status === 1 ? (
                <>
                  <Link
                    to={"/createControl/" + data.code}
                    className="btn btn-success mx-1  btn-sm "
                  >
                    Agregar control de archivo
                  </Link>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </>
        {isRegister && (
          <div className="" style={{ marginBottom: "5px" }}>
            <Archived doc={data.code ? data : null} />
          </div>
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
          <label className="titleLabel">Proceso:</label>
          <label className="inputLabel">{data.process_name}</label>
        </div>

        <div className="col-12 col-md-5">
          <label className="titleLabel">Nombre del documento:</label>
          <label className="inputLabel px-0">{data.name}</label>
        </div>
        <div className="col-12 col-md-5 align-self-center">
          <label className="titleLabel">
            Fecha de emisión / Ultima revisión:
          </label>
          <label className="inputLabel">{data.last_revision?.substring(0,10)}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Tipologia:</label>
          <label className="inputLabel">{data.typology_name}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Observaciones:</label>
          <label className="inputLabel">{data.comments}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Versión:</label>
          <label className="inputLabel">
            {data.version >= 10
              ? data.version
              : data.version === 0
              ? "OBSOLETO"
              : `0${data.version}`}
          </label>
        </div>

        <div className="col-12 col-md-4 ">
          <label className="titleLabel">Ruta de sharePoint:</label>

          <label className="inputLabel">
        
              {data.link ? (
                <label className="doc-link">{data.link}</label>
              ) : (
                ""
              )}
        
          </label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Estado: </label>
          <label className="inputLabel"> {data.status_name}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Carga al sistema: </label>
          <label className="inputLabel">
            {data.created_at?.toString().split("T")[0]}
          </label>
        </div>
      </div>
      <div className="titleHeader text-center py-1 mt-3">
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

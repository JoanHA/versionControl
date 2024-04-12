import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getOneList } from "../../api/AuditAPI/checklistAPI";
import { GoCheckCircleFill, GoXCircleFill, GoThumbsup } from "react-icons/go";
import DownloadCheckListButton from "./DownloadCheckListButton";
import { Link } from "react-router-dom";

function DownloadCheckList() {
  const [data, setData] = useState({});
  const [reqs, setReqs] = useState([]);

  const params = useParams();

  const getCheckData = async () => {
    try {
      const res = await getOneList(params.id);
      
console.log(res.data)
      setData(res.data.checklist[0]);
      setReqs(res.data.fields);
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    getCheckData();
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex  align-items-center gap-2">
          <DownloadCheckListButton
            data={{ data, reqs }}
          ></DownloadCheckListButton>
          <div>
            {data?.finding_id ? (
              <Link
                className="btn btn-primary text-light"
                to={`/audits/viewReport/${data.finding_id }`}
              >
                Ver reporte
              </Link>
            ) : (
              <Link
                className="btn btn-primary text-light"
                to={`/audits/createReport/${params.id}`}
              >
                Generar Reporte{" "}
              </Link>
            )}
          </div>
        </div>
        <table className="table table-striped table-hover table-bordered ">
          <thead className="table-dark">
            <tr>
              <th rowSpan="2">Pregunta</th>
              <th colSpan="3">Requisito a verificar</th>
              <th rowSpan="2">Cumple</th>
              <th rowSpan="2">No cumple</th>
              <th rowSpan="2">O. Mejora</th>
              <th rowSpan="2">Observaciones</th>
            </tr>
            <tr>
              <th>ISO 9001</th>
              <th>ISO 45001</th>
              <th>Decreto 1075</th>
            </tr>
          </thead>
          <tbody>
            {reqs?.length > 0 ? (
              reqs.map((r) => (
                <tr key={r.id}>
                  <td>{r.question}</td>
                  <td>{r.iso9001_article}</td>
                  <td>{r.iso45001_article}</td>
                  <td>{r.decreto_article}</td>
                  <td className="text-center">
                    {r.filled === 1 ? (
                      <div>
                        <GoCheckCircleFill size={30} />
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-center">
                    {r.not_filled === 1 ? (
                      <div>
                        <GoXCircleFill size={30} />
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {r.get_better === 1 ? (
                      <div>
                        <GoThumbsup size={30} />
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{r.observations}</td>
                </tr>
              ))
            ) : (
              <td colSpan={7}>No hay datos...</td>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DownloadCheckList;

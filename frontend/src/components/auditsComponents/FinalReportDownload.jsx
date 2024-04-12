import React, { useEffect, useState } from "react";
import { validate } from "../../api/AuditAPI/reportsAPI";
import { Link, useNavigate } from "react-router-dom";

function FinalReportDownload({ id }) {
  const [status, setStatus] = useState(true);
  const [mistakes, setMistakes] = useState([]);
  const [display, setDisplay] = useState("none");
  const navigate = useNavigate();

  useEffect(() => {
    const validateStatus = async () => {
      var state = false;
      const errores = [];
      try {
        const res = await validate(id);
        const datos = res.data;
        if (datos.length > 0) {
          datos.forEach((element) => {
            if (element.status !== 5) {
              state = true;
              errores.push(
                `Debes terminar la lista de chequeo de la auditoria del dia ${element.date} que empieza a las ${element.init_time} y termina a las ${element.end_time} `
              );
            }
          });
        } else {
          state = true;
        }
        setMistakes(errores);

        setStatus(state);
      } catch (error) {
        console.log(error);
      }
    };
    validateStatus();
  });
  return (
    <div className="px-4">
      <div className={`d-${display}`} id="card-errors">
        <button
          className="btn btn-close"
          onClick={() => setDisplay("none")}
        ></button>
        <span className="">
          {mistakes.map((e, i) => (
            <p>
              {i + 1}.{e}
            </p>
          ))}
        </span>
      </div>
      <div onMouseEnter={status ? () => setDisplay("block") : null}>
        <button
          className="btn btn-dark my-1"
          disabled={status}
          onClick={() => {
            navigate(`/audits/createFinal/${id}`);
          }}
        >
          Crear informe final
        </button>
      </div>
    </div>
  );
}

export default FinalReportDownload;

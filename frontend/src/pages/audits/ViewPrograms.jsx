import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getOneProgram } from "../../api/AuditAPI/auditProgramsAPI";
import AddProgramField from "./AddProgramField";
export default function ViewPrograms() {
  const params = useParams();
  const [program, setProgram] = useState({});
  const [fields, setFields] = useState([]);
  const getdata = async () => {
    try {
      const res = await getOneProgram(params.id);
     
      for (let i = 0; i < res?.data.fields.length; i++) {
        const field = res?.data.fields[i];
        var names = "";
        for (let j = 0; j < field.inspectors.length; j++) {
          const element = field.inspectors[j];
          names += element.inspector_name + ", ";
        }
        names = names.substring(0, names.length - 2);
        res.data.fields[i].inspector_name = names;
      }

      setProgram(res.data.program[0]);
      setFields(res.data.fields);
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="px-2">
      <div className="titleHeader">Auditorias y autoinspecciones</div>
      <div className="px-3">
        <Link
          onClick={() => {
            history.back();
          }}
        >
          <FaArrowCircleLeft size={20} />
        </Link>
      </div>
      <div className="px-3">
        <div className=" mt-1 mb-2">
          <div className="row gap-2 ">
            <div className="col-12 col-md-5">
              <label>
                <strong>Objetivo: </strong> {program.objective}
              </label>
            </div>
            <div className="col-12 col-md-5">
              <label>
                <strong>Alcance:</strong> {program.scope}
              </label>
            </div>
            <div className="col-12 col-md-5">
              <label>
                <strong>Vigencia:</strong> {program.validity?.split("T")[0]}
              </label>
            </div>
          </div>
          <div className="my-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                document.querySelector("#add-program-modal").style.display =
                  "flex";
              }}
            >
              Agregar proceso a auditar
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Rango fecha</th>
                <th>Tipo</th>
                <th>Lugar</th>
                <th>Proceso</th>
                <th>Auditores</th>
                <th>Auditados</th>
                <th>Criterio</th>
                <th>Plan</th>
              </tr>
            </thead>
            <tbody>
              {fields?.length > 0 ? (
                fields.map((e) => (
                  <tr>
                    <td className="text-center"> {e.type === 500 ? `${e.date} hasta ${e.end_date}` :e.date} </td>
                    <td className="text-center"> {e.type_name}</td>
                    <td className="text-center"> {e.place}</td>
                    <td className="text-center">{e.process_name} </td>
                    <td className="text-center">{e.inspector_name} </td>
                    <td className="text-center">{e.to_audit} </td>
                    <td
                      className="text-center"
                      colSpan={e.type === 500 ? 1 : 1}
                    >
                      {e.criteria}
                    </td>
                    {e.type === 500 ? (
                      e.plansQty < 1 ? (
                        <td className="text-center">
                          <Link
                            className="btn btn-success btn-sm"
                            to={`/audits/plans/create/${e.id}`}
                          >
                            Crear plan
                          </Link>
                        </td>
                      ) : (
                        <td className="text-center">
                          <Link
                            className="btn btn-success btn-sm"
                            to={`/audits/plans/view/${e.audit_plan_id}`}
                          >
                            Ver plan
                          </Link>
                        </td>
                      )
                    ) : (
                      <td className="text-danger fw-bold">No aplica </td>
                    )}
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <AddProgramField
          programId={params.id}
          callback={getdata}
        ></AddProgramField>
      </div>
    </div>
  );
}

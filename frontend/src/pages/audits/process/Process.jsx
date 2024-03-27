import React, { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getProcesses } from "../../../api/AuditAPI/process";
function Process() {
  const [processes, setProcesses] = useState([]);
  const bringProcesses = async () => {
    try {
      const res = await getProcesses();
  
      setProcesses(res.data);
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    bringProcesses();
  }, []);

  const deleteProcess = async(id)=>{

  }
  return (
    <div>
      <div className="col-lg-12 col-sm-12">
        <div className="">
          <div className="titleHeader">
            Procesos
            <button
              className="addbtn"
              type="button"
              onClick={() => {
                // newParam("Proceso", 3);
              }}
            ></button>
          </div>
          <div className="d-flex gap-2 flex-wrap px-4">
            <div>
                <Link className="btn btn-primary m-0" to={"/audits/createProcess"}>Agregar nuevo</Link>
            </div>
            {processes && (
              <table className="table table-sm table-striped table-hover table-light">
                <thead>
                  <tr>
                    <th>Proceso</th>
                    <th>Requisitos</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.map((e) => (
                    <tr className="text-center" key={e.id}>
                      <td>{e.name}</td>
                      <td>
                        {e.articles.length> 0 ?e.articles.map((e)=> `* ${e.article}   `) :"N/A" }</td>
                      <td colSpan={2}>
                        <div className="d-flex gap-1 align-items-center justify-content-center">
                          <Link className="btn btn-warning" to={`/audits/createProcess/${e.id}`}>Editar</Link>
                          <button className="btn btn-danger" onClick={()=>{deleteProcess(e.id)}}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Process;

import React, { useEffect, useState } from "react";

import Select from "react-select";
import { getProcesses } from "../../api/AuditAPI/process";
import { getAudiTypes } from "../../api/AuditAPI/params";
import { getAllInspectors } from "../../api/AuditAPI/inspectorsAPI";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { createProgram } from "../../api/AuditAPI/auditProgramsAPI";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
function CreateProgram() {
  //selects options
  const [types, setTypes] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [processes, setProcesses] = useState([]);

  const [objective, setObjective] = useState(""); //Value for the objetive in the program
  const [scope, setScope] = useState(""); //Value for the scope in the program
  const [validity, setValidity] = useState(""); //Value for the vigencia in the program

  //selects values
  const [auditType, setAuditType] = useState(null);
  const [auditProcess, setAuditProcess] = useState(null);
  const [auditInspectors, setAuditInspectors] = useState([]);

  //Array of processes
  const [process_audit, setProcess_audit] = useState([]);

  const fillSelects = async () => {
    const processRes = await getProcesses();
    const typesRes = await getAudiTypes();
    const inspectorsRes = await getAllInspectors();

    const process = processRes.data.map((p) => {
      const dato = {
        label: p.name,
        value: p.id,
      };
      return dato;
    });
    const types = typesRes.data.map((t) => {
      const dato = {
        label: t.name,
        value: t.id,
      };
      return dato;
    });
    const inspectors = inspectorsRes.data.map((t) => {
      const dato = {
        label: t.full_name,
        value: t.id,
      };
      return dato;
    });
    setProcesses(process);
    setTypes(types);
    setInspectors(inspectors);
  };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    fillSelects();
  }, []);
  const clean = () => {
    setAuditInspectors(null);
    setAuditProcess(null);
    setAuditType(null);
    reset();
  };
  const onSubmit = (values) => {
    values.inspectors = auditInspectors;
    values.processes_id = auditProcess.value;
    values.type = auditType.value;
    values.process_name = auditProcess.label;
    values.type_name = auditType.label;

    var texto = " ";
    var inspectors_id = [];
    for (let i = 0; i < values.inspectors.length; i++) {
      const element = values.inspectors[i];
      inspectors_id.push(element.value);
      texto += element.label?.concat(
        i == values.inspectors.length - 1 ? "" : ", "
      );
    }
    values.inspectors_id = inspectors_id;
    values.inspectors = texto;
console.log(values)
    const array = process_audit;
    array.push(values);
    setProcess_audit(array);

    //limpiar formulario
    clean();
  };

  const saveProgram = async () => {
    const dataToSend = {};
    const errores = [];
    objective === ""
      ? errores.push("El objetivo del programa no puede estar vacio")
      : "";
    scope === ""
      ? errores.push("El alcance del programa no puede estar vacio")
      : "";
    validity === ""
      ? errores.push("La vigencia del programa no puede estar vacia")
      : "";
    if (process_audit.length < 1) errores.push("No hay procesos a auditar");

    if (errores.length > 0) {
      return swal.fire(
        "No puedes guardar el programa aún",
        errores.map((e) => e).toString() + "\n",
        "error"
      );
    }
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dataToSend.audit_programs = {
          objective,
          scope,
          validity,
          status: 1,
        };
        const cleanData = process_audit.map((p) => {
          delete p.inspectors;
          delete p.process_name;
          delete p.type_name;
          return p;
        });

        dataToSend.audit_programs_fields = {
          ...cleanData,
        };
        try {
          const res = await createProgram(dataToSend);
          swal.fire(res.data, "", "success");
       
          reset();
          clean();
          setProcess_audit([]);
          setValidity("");
          setScope("");
          setObjective("");
          history.back();
        } catch (error) {
          swal.fire(error.response.data, "", "error");
        }
      }
    });
  };
  const deleteAuditProcess = (id) => {
    const deletedArray = process_audit.filter((p, index) => index !== id);
    setProcess_audit(deletedArray);
  };

  return (
    <div className="px-2">
      <div className="titleHeader">
        <span>Programa de auditorias</span>
      </div>
      <div className="px-3">
        <Link to="/audits/programs">
          <FaArrowCircleLeft size={20} />
        </Link>
      </div>
      <div className="px-2">
        <div className="row m-0">
          <div className="col-12 col-md-6 ">
            <label className="fw-bold">Objetivo:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Objetivo..."
              value={objective}
              required
              onChange={(e) => setObjective(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="fw-bold">Alcance: </label>
            <input
              type="text"
              className="form-control"
              placeholder="Alcance..."
              value={scope}
              required
              onChange={(e) => setScope(e.target.value)}
            />
          </div>{" "}
          <div className="col-12 col-md-6">
            <label className="fw-bold">Vigencia: </label>
            <input
              type="date"
              className="form-control"
              value={validity}
              required
              onChange={(e) => setValidity(e.target.value)}
            />
          </div>
        </div>
        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="px-3">
            {" "}
            <strong>Auditoria a programar</strong>
          </h5>
          <div className="row m-0">
            {auditType?.value == 500 ? (
              <>
                <div className="col-12 col-md-3">
                  <div>
                    <label>Fecha de inicio</label>
                  </div>
                  <div>
                    <input
                      type="date"
                      className="form-control"
                      {...register("date", { required: true })}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <div>
                    <label>Fecha de fin</label>
                  </div>
                  <div>
                    <input
                      type="date"
                      className="form-control"
                      {...register("end_date", { required: true })}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="col-12 col-md-6">
                  <div>
                    <label>Fecha de auditoria</label>
                  </div>
                  <div>
                    <input
                      type="date"
                      className="form-control"
                      {...register("date", { required: true })}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="col-12 col-md-6">
              <div>
                <label>Tipo de auditoria</label>
              </div>
              <div>
                <Select
                  options={types}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  required
                  value={auditType}
                  onChange={setAuditType}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div>
                <label>Lugar de auditoria</label>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bogotá, Cali..."
                  {...register("place", { required: true })}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div>
                <label>Proceso</label>
              </div>
              <div>
                <Select
                  options={processes}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  required
                  value={auditProcess}
                  onChange={setAuditProcess}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div>
                <label>Auditores</label>
              </div>
              <div>
                <Select
                  isMulti
                  options={inspectors}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  required
                  value={auditInspectors}
                  onChange={setAuditInspectors}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div>
                <label>Auditados</label>
              </div>
              <div>
                <textarea
                  className="form-control"
                  {...register("to_audit", { required: true })}
                ></textarea>
              </div>
            </div>{" "}
            <div className="col-12 col-md-6">
              <div>
                <label>Criterio de auditoria</label>
              </div>
              <div>
                <textarea
                  className="form-control"
                  placeholder="Criterio..."
                  {...register("criteria", { required: true })}
                ></textarea>
              </div>
            </div>
            <div>
              <button className="btn btn-success mt-2">Agregar</button>
            </div>
          </div>
        </form>
        <div>
          {/* Tabla */}
          <div
            className="p-2 mt-3"
            style={{
              boxShadow: "0px 0px 5px 4px lightgray",
            }}
          >
            <div className="h-2" />
            <div className="d-flex justify-content-between  align-items-center px-3 py-1">
              <h5 className="fw-bold">Procesos a auditar</h5>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={saveProgram}
              >
                Guardar Programa
              </button>
            </div>
            <table className="table table-responsive table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Rango de fecha</th>
                  <th>Tipo de auditoria</th>
                  <th>Lugar de auditoria</th>
                  <th>Proceso</th>
                  <th>Auditores</th>
                  <th>Auditado</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {process_audit.length > 0 ? (
                  process_audit.map((p, index) => (
                    <tr key={index}>
                      <td className="text-center"> {p.date} - {p.end_date}</td>
                      <td className="text-center">{p.type_name} </td>
                      <td className="text-center">{p.place} </td>
                      <td className="text-center">{p.process_name} </td>
                      <td className="text-center">{p.inspectors} </td>
                      <td className="text-center">{p.to_audit} </td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-danger">
                          <MdDelete
                            size={20}
                            onClick={() => {
                              deleteAuditProcess(index);
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No hay datos aún...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProgram;

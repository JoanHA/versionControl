import React, { useEffect, useState } from "react";

import Select from "react-select";
import { getProcesses } from "../../api/AuditAPI/process";
import { getAudiTypes } from "../../api/AuditAPI/params";
import { getAllInspectors } from "../../api/AuditAPI/inspectorsAPI";
import { useForm } from "react-hook-form";
import { addProgramField } from "../../api/AuditAPI/auditProgramsAPI";

export default function AddProgramField({ programId, callback }) {
  //selects options
  const [types, setTypes] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [processes, setProcesses] = useState([]);

  //selects values
  const [auditType, setAuditType] = useState(null);
  const [auditProcess, setAuditProcess] = useState(null);
  const [auditInspectors, setAuditInspectors] = useState([]);

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
    try {
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
          values.audit_programs_id = Number(programId);
          delete values.inspectors;
          delete values.processes_name;
          delete values.process_name;
          delete values.type_name;
          values.status = 1;
          const res = await addProgramField(values);
          console.log(res);
          swal.fire(res.data, "", "success").then(() => {
            clean();
            callback();
          });
        }
      });
    } catch (error) {}
  };

  return (
    <div className="px-2" id="add-program-modal">
      <div id="add-program-container">
        <div className="titleHeader">
          <span>Auditoria a programar</span>
        </div>

        <div className="px-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h5 className="px-3">
              {" "}
            
            </h5>
            <div className="row m-0">
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
              <div className="mt-2 d-flex gap-2 flex-wrap align-items-center ">
                <button className="btn btn-success">Agregar</button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    document.querySelector("#add-program-modal").style.display = "NONE";
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

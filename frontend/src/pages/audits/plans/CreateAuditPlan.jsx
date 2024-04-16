import React, { useEffect, useState } from "react";
import Select from "react-select";
import AddRiskPlan from "../../../components/auditsComponents/AddRiskPlan";
import { useForm } from "react-hook-form";
import AuditPlanProcess from "../../../components/auditsComponents/AuditPlanProcess";
import { getAllInspectors } from "../../../api/AuditAPI/inspectorsAPI";
import { getProcessReq, getProcesses } from "../../../api/AuditAPI/process";
import AddInspector from "../../../components/auditsComponents/AddInspector";
import { MdDelete } from "react-icons/md";
import { createAuditPlan } from "../../../api/AuditAPI/auditPlanAPI";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
function CreateAuditPlan() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [addRisk, setAddRisk] = useState(false);
  const [addInspector, setAddInspector] = useState(false);
  const {user}=useAuth()

  const params = useParams();

  //------------Valores el plan de auditoria----------------
  const [objective, setObjective] = useState("");
  const [scope, setScope] = useState("");
  const [oportunities, setOportunities] = useState("");
  const [criteria, setCriteria] = useState("");
  const [leader, setLeader] = useState("");
  const [validity,setValidity] = useState("")

  //------------Valores el plan de auditoria----------------

  //Llenar selects
  const [inspectors, setInspectors] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [auditGroup, setAuditGroup] = useState([]);
  const [process, setProcess] = useState(null);
  const [iso9, setIso9] = useState([]);
  const [iso4, setIso4] = useState([]);
  const [decreto, setDecreto] = useState([]);
  const [riskPlan, setRiskPlan] = useState([]);
  const [inspeRol, setInspectRol] = useState([]);
  //--------------------------------------------------
  //Valor para la tabla
  const [plan_fields, setPlan_fields] = useState([]);
  const deleteAuditProcess = (id) => {
    const deletedArray = plan_fields.filter((p, index) => index !== id);
    setPlan_fields(deletedArray);
  };
  const clean = () => {
    const saveddate = watch("date")
    reset();
    reset({
      date:saveddate
    })
    setInspectRol([]);
    setProcess(null);
    setIso4([]);
    setIso9([]);
    setDecreto([]);
  };
  const cleanAll = () => {
    setObjective("");
    setScope("");
    setOportunities("");
    setCriteria("");
    setLeader("");
    setAuditGroup([]);
    setPlan_fields([]);
    setRiskPlan([]);
    clean();
  };
  const onSubmit = (values) => {
    const inspectores = inspeRol.map((e) => {
      return {
        inspector: e.inspector.value,
        rol: e.rol.value,
      };
    });
    if (inspectores.length < 1) {
      return swal.fire("No has seleccionado ningún auditor para este proceso");
    }
    values.inspectors = inspectores;
    values.process_name = process.label;
    values.processes_id = process.value;
    values.status = 1;
    const plan = plan_fields;
    plan.push(values);
    setPlan_fields(plan);
    clean();
  };

  const fillSelects = async () => {
    try {
      const inspectorsRes = await getAllInspectors();
      const processRes = await getProcesses();
      const procesos = [];
      const options = [];

      processRes.data.map((ins) => {
        procesos.push({
          value: ins.id,
          label: ins.name,
        });
      });
      inspectorsRes.data.map((ins) => {
        options.push({
          value: ins.id,
          label: ins.full_name,
        });
      });
      setProcesses(procesos);
      setInspectors(options);
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    fillSelects();
  }, []);
  useEffect(() => {
    if (process) {
      const iso9 = [];
      const iso45 = [];
      const decreto = [];
      const getProcessreq = async () => {
        const res = await getProcessReq(process.value);
        res.data.forEach((element) => {
          if (element.iso_9001 === 1) {
            iso9.push({
              label: ` (${element.article}) - ${element.name}`,
              value: element.id,
            });
          } else if (element.iso_45001 === 1) {
            iso45.push({
              label: ` (${element.article}) - ${element.name}`,
              value: element.id,
            });
          } else {
            decreto.push({
              label: ` (${element.article}) - ${element.name}`,
              value: element.id,
            });
          }
        });
        setIso4(iso45);
        setIso9(iso9);
        setDecreto(decreto);
      };
      getProcessreq();
    }
  }, [process]);
  const fillRiskAndPlan = (data) => {
    const datos = riskPlan;
    datos.push(data);
    setRiskPlan(datos);
  };
  const fillInspectAndRol = (data) => {
    const datos = inspeRol;
    datos.push(data);
    setInspectRol(datos);
  };
  const SavePlan = async () => {
    if (plan_fields.length < 1) {
      return swal.fire(
        "No puedes guardar el plan",
        "No hay procesos en este plan",
        "info"
      );
    }

    const errores = [];
    //Validacion de campos
    objective.trim() === "" || objective.trim().length < 1
      ? errores.push(
          "<p className='m-0'>El campo Objetivo no puede estar vacio</p>"
        )
      : "";
    criteria.trim() === "" || criteria.trim().length < 1
      ? errores.push(
          "<p className='m-0'>El campo Criterio no puede estar vacio</p>"
        )
      : "";
    scope.trim() === "" || scope.trim().length < 1
      ? errores.push(
          "<p className='m-0'>El campo Alcance no puede estar vacio</p>"
        )
      : "";
    oportunities.trim() === "" || oportunities.trim().length < 1
      ? errores.push(
          "<p className='m-0'>El campo Oportunidades no puede estar vacio</p>"
        )
      : "";
    leader.trim() === "" || leader.trim().length < 1
      ? errores.push(
          "<p className='m-0'>El campo Auditor lider no puede estar vacio</p>"
        )
      : "";
      validity.trim() === "" || validity.trim().length < 1
      ? errores.push(
          "<p className='m-0'>El campo Vigencia no puede estar vacio</p>"
        )
      : "";
    riskPlan.length < 1
      ? errores.push("<p className='m-0'>Debes agregar almenos un riesgo</p>")
      : "";
    if (errores.length > 0) {
      const texto = `${errores.map((e) => e)}`.replaceAll(",", " ");

      swal.fire("No puedes guardar el plan de auditoria", texto, "error");
    }

    const audit_group = auditGroup.map((e) => {
      return e.value;
    });
    const audit_plan = {
      objective,
      scope,
      criteria,
      oportunities,
      leader,
      audit_group,
      risk: riskPlan,
      created_by:user.id,
      validity
    };

   
    const dataToSend = {
      audit_plan,
      plan_fields,
      audit_program_fields:params.id
    };
    
    try {
      const res = await createAuditPlan(dataToSend);
      swal.fire(res.data, "", "success").then(() => {
        cleanAll();
        history.back()
      });
    } catch (error) {
      console.log(error);
      swal.fire(error.response.data, "", "error");
    }
  };

  return (
    <div id="create-plan" className="px-2">
      <div className="titleHeader">Crear plan de auditoria</div>
      <div>
        <button
          className="btn btn-sm"
          onClick={() => {
            history.back();
          }}
        >
          <FaArrowCircleLeft size={20} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row m-0">
          <div className="col-12 col-md-6">
            <div>
              <label htmlFor="">Objetivo</label>
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Verificar el cumplimiento..."
                value={objective}
                onChange={(e) => {
                  setObjective(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div>
              <label>Alcance</label>
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Aplicar ..."
                value={scope}
                onChange={(e) => {
                  setScope(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div>
              <label htmlFor="">Criterio</label>
            </div>
            <div>
              <input
                type="text"
                placeholder="Norma ISO..."
                className="form-control"
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div>
              <label htmlFor="">Auditor lider</label>
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Analista de calidad"
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
              />
            </div>
          </div>  <div className="col-12 col-md-6">
            <div>
              <label htmlFor="">Vigencia</label>
            </div>
            <div>
              <input
                type="date"
                className="form-control"
                placeholder="Analista de calidad"
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div>
              <label>Equipo auditor</label>
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                options={inspectors}
                className="basic-multi-select"
                classNamePrefix="select"
                required
                isMulti
                value={auditGroup}
                onChange={setAuditGroup}
              />
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div>
              <label htmlFor="">Oportunidades</label>
            </div>
            <div>
              <textarea
                className="form-control"
                placeholder="Oportunidades de mejora"
                onChange={(e) => setOportunities(e.target.value)}
                value={oportunities}
              ></textarea>
            </div>
          </div>
          <div className="col-12">
            <div>
              <label>Riegos y planes de contingencia</label>
              <button
                className="btn btn-sm btn-secondary mx-2"
                type="button"
                onClick={() => {
                  setAddRisk(true);
                }}
              >
                +
              </button>
            </div>
            <div className="row m-0  flex-wrap">
              {riskPlan.length > 0
                ? riskPlan.map((rp, index) => (
                    <div className="d-flex gap-2 col-12 col-md-6">
                      <label htmlFor="">{index + 1}.</label>
                      <label className="fw-medium">
                        <strong>Riesgo: </strong> {rp?.risk}
                      </label>
                      <label className="fw-medium">
                        <strong>Plan: </strong>
                        {rp?.plan}
                      </label>
                    </div>
                  ))
                : "Ninguno..."}
            </div>
            {addRisk && (
              <AddRiskPlan
                close={() => {
                  setAddRisk(false);
                }}
                callback={fillRiskAndPlan}
              />
            )}
          </div>
        </div>
        <hr className="shadow" />
        <h4>Registar proceso a auditar</h4>
        <div className="row m-0">
        
          <div className="col-12 col-md-6">
            <div>
              <label>Fecha</label>
            </div>
            <div>
              <input
                type="date"
                className="form-control"
                {...register("date", { required: true })}
              />
              {errors.date?.type === "required" && (
                <p className="errorMsg">Este campo es obligatorio</p>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex gap-1 ">
            <div className="flex-fill">
              <div>
                <label htmlFor="">Hora de inicio</label>
              </div>
              <div>
                <input
                  type="time"
                  className="form-control"
                  {...register("init_time", { required: true })}
                />
                {errors.init_time?.type === "required" && (
                  <p className="errorMsg">Este campo es obligatorio</p>
                )}
              </div>
            </div>
            <div className="flex-fill">
              <div>
                <label htmlFor="">Hora de fin</label>
              </div>
              <div>
                <input
                  type="time"
                  className="form-control"
                  {...register("end_time", { required: true })}
                />
                {errors.end_time?.type === "required" && (
                  <p className="errorMsg">Este campo es obligatorio</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div>
              <label>Lugar</label>
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Sedes..."
                {...register("place", { required: true })}
              />
              {errors.place?.type === "required" && (
                <p className="errorMsg">Este campo es obligatorio</p>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div>
              <label>Proceso</label>
            </div>
            <div>
              <Select
                options={processes}
                onChange={setProcess}
                isClearable
                required
                value={process}
              ></Select>
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div className="d-flex gap-2">
              <label>Auditor(es)</label>
              <div>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => {
                    setAddInspector(true);
                  }}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
            <div className="row m-0  flex-wrap">
              {" "}
              {inspeRol.length > 0
                ? inspeRol.map((rp, index) => (
                    <div className="d-flex gap-2 col-12 col-md-6">
                      <label htmlFor="">{index + 1}.</label>
                      <label className="fw-medium">
                        <strong>Auditor: </strong> {rp?.inspector?.label}
                      </label>
                      <label className="fw-medium">
                        <strong>Rol: </strong>
                        {rp?.rol?.label}
                      </label>
                    </div>
                  ))
                : "Ninguno..."}
            </div>

            {addInspector && (
              <AddInspector
                inspectors={auditGroup}
                close={() => {
                  setAddInspector(false);
                }}
                callback={fillInspectAndRol}
              />
            )}
          </div>
          <div className="col-12 col-md-6">
            <div>
              <label>Auditado</label>
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Lideres de procesos, etc..."
                {...register("to_audit", { required: true })}
              />
              {errors.to_audit?.type === "required" && (
                <p className="errorMsg">Este campo es obligatorio</p>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div>
              <label>Recursos</label>
            </div>
            <div>
              <textarea
                className="form-control"
                placeholder="Documentos de trabajo, videobeam, etc..."
                {...register("resources", { required: true })}
              ></textarea>
              {errors.resources?.type === "required" && (
                <p className="errorMsg">Este campo es obligatorio</p>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div>
              <label>Información digital</label>
            </div>
            <div>
              <textarea
                className="form-control"
                placeholder="Matriz de riesgos etc..."
                {...register("digital_info", { required: true })}
              ></textarea>
              {errors.digital_info?.type === "required" && (
                <p className="errorMsg">Este campo es obligatorio</p>
              )}
            </div>
          </div>
          {/* <div className="col-12 col-md-12  m-0">
            <div className="text-center fw-bold mt-1">
              <h4 className="m-0">Criterios</h4>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <div className="col-12 col-md-6">
                <div>
                  {" "}
                  <label>ISO 9001</label>
                </div>
                <div className="row  m-0 flex-wrap gap-2">
                  {iso9.length > 0
                    ? iso9.map((i) => <div className="col-5">{i.label}</div>)
                    : "Ningúno."}
                </div>
              </div>
              <div className="col-12 col-md-5">
                <div>
                  <label>ISO 45001</label>
                </div>
                <div className="row  m-0 flex-wrap gap-2">
                  {iso4.length > 0
                    ? iso4.map((i) => <div className="col-5">{i.label}</div>)
                    : "Ningúno."}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  <label>Decreto 1072</label>
                </div>
                <div>
                  <div className="row  m-0 flex-wrap gap-2">
                    {decreto.length > 0
                      ? decreto.map((i) => (
                          <div className="col-5">{i.label}</div>
                        ))
                      : "Ningúno."}
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div>
            <button className="btn btn-primary my-2">Agregar</button>
          </div>
        </div>
      </form>
      <hr />
      <div>
        <div className="shadow p-1">
          <div className="d-flex justify-content-between">
            <div>
              <h3 htmlFor="">Procesos En El Plan</h3>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-success"
                onClick={SavePlan}
              >
                Crear plan
              </button>
            </div>
          </div>
          <table className="table table-striped table-hover table-dark">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Lugar</th>
                <th>Proceso</th>
                <th>Auditado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {plan_fields.length > 0 ? (
                plan_fields.map((p, index) => (
                  <tr key={index}>
                    <td className="text-center"> {p.date} </td>
                    <td className="text-center">
                      {p.init_time} - {p.end_time}{" "}
                    </td>
                    <td className="text-center">{p.place} </td>
                    <td className="text-center">{p.process_name} </td>
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
  );
}

export default CreateAuditPlan;

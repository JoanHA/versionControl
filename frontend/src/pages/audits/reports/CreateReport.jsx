import React, { useEffect, useRef, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import {
  createReports,
  getRequisitesUnfilled,
} from "../../../api/AuditAPI/reportsAPI";
import { Link, useNavigate, useParams } from "react-router-dom";
import SignaturePad from "react-signature-pad-wrapper";
import { useForm } from "react-hook-form";
import { MdCleaningServices } from "react-icons/md";
import "../../../assets/CSS/admin.css";
function CreateReport() {
  const params = useParams();
  const [plan, setPlan] = useState({});
  const [requistes, setRequisites] = useState([]);
  const signatureRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await getRequisitesUnfilled(params.id);
      const data = res.data[0];
      console.log(data)

      setPlan({
        date: data.date,
        process: data.process_name,
        objective: data.objective,
        inspector: data.leader,
        check_list_id: data.check_list_id,
        audit_plan: data.audit_plan_id,
      });
      const filteredRequisites = res.data.filter(
        (r) => r.not_filled === 1 || r.get_better === 1
      );
      const reqs = [];
      filteredRequisites.map((r) => {
        if (r.iso_45001) {
          reqs.push({
            article: r.iso4_article,
            name: r.iso4_name,
            type: "ISO 45001",
            id: r.iso_45001,
          });
        }
        if (r.iso_9001) {
          reqs.push({
            article: r.iso9_article,
            name: r.iso9_name,
            type: "ISO 9001",
            id: r.iso_9001,
          });
        }
        if (r.decreto) {
          reqs.push({
            article: r.decreto_article,
            name: r.decreto_name,
            type: "Decreo 1072",
            id: r.decreto,
          });
        }
      });
      //quitar repetidos
      let result = reqs.filter(
        (obj, index, self) =>
          index ===
          self.findIndex((t) => t.id === obj.id && t.name === obj.name)
      );

      setRequisites(result);
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const save = async (values) => {
    const datos = Object.entries(values);

    const requisitesIds = requistes.map((r) => r.id);

    const findings = [];

    for (let j = 0; j < requisitesIds.length; j++) {
      const id = requisitesIds[j];

      for (let i = 0; i < datos.length; i++) {
        if (datos[i][0] === `finding-${id}`) {
          findings.push({
            id,
            valor: datos[i][1],
          });
        }
      }
    }
    const url = signatureRef.current.toDataURL();

    const data = {
      get_better: values.get_better,
      strength: values.strength,
      weakness: values.weakness,
      findings: findings,
      img: url,
      audit_plan: plan.audit_plan,
      check_list_id: plan.check_list_id,
    };

    try {
      const res = await createReports(data);
      swal.fire(res.data, "", "success").then(()=>history.back());
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  const onSubmit = (values) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Guardar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!signatureRef.current.isEmpty()) {
          return await save(values);
        } else {
          Swal.fire({
            title: "La firma esta vacia?",
            text: "Estas seguro de guardar el archivo sin la firma?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Guardar!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await save();
            }
          });
        }
      }
    });
  };
  return (
    <div className="px-3">
      <div className="titleHeader">Creación de reportes de hallazgos</div>
      <button
        className="btn"
        onClick={() => {
          history.back();
        }}
      >
        <FaArrowCircleLeft size={20} />
      </button>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Main info */}
          <div className="row p-0 m-0 gap-2">
            <div className="col-12 col-md-5 d-flex flex-wrap gap-2">
              <div>
                <label htmlFor="date">
                  <strong>Fecha de auditoria:</strong>
                </label>
              </div>
              <div className="flex-fill">
                <input
                  type="text"
                  defaultValue={plan?.date}
                  className="form-control form-control-sm border border-0"
                  readOnly
                  id="date"
                />
              </div>
            </div>
            <div className="col-12 col-md-5 d-flex flex-wrap gap-2">
              <div>
                <label htmlFor="check_list">
                  <strong>Lista de chequeo:</strong>
                </label>
              </div>
              <div className="flex-fill" id="check_list">
                <Link
                  className="text-primary text-underline link-opacity-1"
                  to={`/audits/checklist/${plan.check_list_id}`}
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  Ver
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-5 d-flex flex-wrap gap-2">
              <div>
                <label htmlFor="objective">
                  <strong>Objetivo:</strong>
                </label>
              </div>
              <div className="flex-fill">
                <textarea
                  defaultValue={plan?.objective}
                  type="text"
                  rows={3}
                  className="form-control form-control-sm border border-0"
                  id="objective"
                  readOnly
                />
              </div>
            </div>
            <div className="col-12 col-md-5 d-flex flex-wrap gap-2">
              <div>
                <label htmlFor="process">
                  <strong>Proceso:</strong>
                </label>
              </div>
              <div className="flex-fill">
                <input
                  defaultValue={plan?.process}
                  type="text"
                  className="form-control form-control-sm border border-0"
                  id="process"
                  readOnly
                />
              </div>
            </div>
            <div className="col-12 col-md-5 d-flex flex-wrap gap-2">
              <div className="me-2">
                <label htmlFor="strength">
                  <strong>Fortalezas</strong>
                </label>
              </div>
              <div className="flex-fill">
                <textarea
                  cols={30}
                  {...register("strength", { required: true })}
                  style={{ maxHeight: "120px" }}
                  rows={1}
                  className="form-control form-control-sm "
                  id="strength"
                />
                {errors.strength?.type === "required" && (
                  <p className="errorMsg">Este campo es obligatorio</p>
                )}
              </div>
            </div>

            <div className="col-12 col-md-5 d-flex flex-wrap gap-2">
              <div>
                <label htmlFor="inspector">
                  <strong>Auditor:</strong>
                </label>
              </div>
              <div className="flex-fill">
                <input
                  defaultValue={plan?.inspector}
                  type="text"
                  className="form-control form-control-sm border border-0"
                  id="inspector"
                />
              </div>
            </div>
            <div className="col-12 col-md-5 d-flex flex-wrap gap-2">
              <div>
                <label htmlFor="weakness">
                  <strong>Debilidades</strong>
                </label>
              </div>
              <div className="flex-fill">
                <textarea
                  type="text"
                  cols={30}
                  {...register("weakness", { required: true })}
                  style={{ maxHeight: "120px" }}
                  rows={1}
                  className="form-control form-control-sm"
                  id="weakness"
                />{" "}
                {errors.weakness?.type === "required" && (
                  <p className="errorMsg">Este campo es obligatorio</p>
                )}
              </div>
            </div>
          </div>

          {/* form */}
          <div className="my-3">
            <div className="row gap-2 ">
              <div className="col-6 border  text-center ">
                <h3 htmlFor="">
                  <strong>Criterio o requisito verificado</strong>
                </h3>
              </div>
              <div className="col-5 border text-center">
                <h3 htmlFor="">
                  <strong>Hallazgos </strong>
                </h3>
              </div>
            </div>
            {requistes.length > 0 ? (
              requistes.map((r, index) => (
                <div key={index} className="row gap-2 my-2">
                  <div className="col-6  text-center ">
                    <label htmlFor="">
                      <strong>{` (${r.article})  ${r.type} - ${r.name}  `}</strong>
                    </label>
                  </div>
                  <div className="col-5  text-center">
                    <textarea
                      style={{ maxHeight: "120px" }}
                      {...register(`finding-${r.id}`, { required: true })}
                      placeholder="Declaración del hallazgo + descripción del requisito evaluado + descripción de la evidencian..."
                      rows="3"
                      className="flex-fill form-control "
                    ></textarea>
                  </div>
                </div>
              ))
            ) : (
              <div className="row">
                <div className="col-12 text-center my-2">
                  <h4>
                    No hay requisitos de no conformidad o de oportunidad de
                    mejora
                  </h4>
                </div>
              </div>
            )}
          </div>
          <div>
            <div>
              <h5>Observaciones</h5>
            </div>
            <div>
              <textarea
                placeholder="Observaciones..."
                className={"form-control"}
                cols="20"
                {...register("get_better")}
                rows="5"
                style={{ maxHeight: "120px" }}
              ></textarea>
            </div>
          </div>
          <div>
            <div>
              <h5 htmlFor="">Firma del auditor</h5>
            </div>
            <div>
             
            </div>
           
              <><div
                  className="d-flex align-items-center my-1  justify-content-between"
                  style={{ maxWidth: "348px" }}
                >
                  <p className="p-0 m-0">Dibuja la firma</p>

                  <button
                    className="btn btn-warning btn-sm"
                    id="clear-btn"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Tooltip on top"
                    type="button"
                    onClick={() => {
                      signatureRef.current.clear();
                    } }
                  >
                    <MdCleaningServices size={20} />
                  </button>
                </div><div id="signature-pad" className=" ">
                    <SignaturePad redrawOnResize height={98} ref={signatureRef} />
                  </div></>
           
            <div>
              <div className="my-2 d-flex ">
                <button className="btn btn-success mb-1">Guardar </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReport;

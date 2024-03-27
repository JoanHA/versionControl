import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getProcessReq } from "../../../api/AuditAPI/process";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
function CheckList() {
  const { audit_plan } = useAuth();
  const [data, setData] = useState(audit_plan);
  const [reqs, setReqs] = useState([]);
  const { register, handleSubmit, reset, watch } = useForm();
  const getReqs = async () => {
    try {
      const res = await getProcessReq(data.processes_id);
      setReqs(res.data);
      console.log(res.data)
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    setData(audit_plan);
    getReqs();
  }, []);

  const onSubmit = async (values) => {
    console.log(values);
  };
  return (
    <div className="px-3">
      <div className="titleHeader">Lista de chequeo</div>
      <div>
        <button
          className="btn"
          onClick={() => {
            history.back();
          }}
        >
          <FaArrowCircleLeft size={20} />
        </button>
        {/* Audit info */}
        <div>
          <div className="d-flex flex-row gap-3">
            <label>
              <strong>Fecha:</strong>
            </label>
            <label>{data?.date}</label>
          </div>
          <div className="d-flex flex-row gap-3">
            <label>
              <strong>Auditor:</strong>
            </label>
            <label>
              {data?.field_inspector.length > 0
                ? data.field_inspector.map((ins) => `${ins.full_name}`)
                : "N/A"}
            </label>
          </div>
          <div className="d-flex flex-row gap-3">
            <label>
              <strong>Proceso:</strong>
            </label>
            <label>{data?.process_name}</label>
          </div>
        </div>
        <hr />
        {/* Campos  */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex gap-2 my-2">
            <button className="btn btn-success btn-sm">Guardar</button>
            <button className="btn btn-primary btn-sm">Archivar</button>
          </div>
          <div className="mb-2">
            <div className="row p-0 m-0 gap-2 ">
              <div className="col-2 check-list-box text-center ">
                <label htmlFor="">
                  <strong>Pregunta</strong>
                </label>
              </div>
              <div className="col-2 check-list-box text-center">
                <label htmlFor="">
                  <strong>Requisito a verificar</strong>
                </label>
              </div>
              <div className="col-1 check-list-box text-center">
                <label htmlFor="">
                  <strong>Cumple</strong>
                </label>
              </div>
              <div className="col-1 check-list-box text-center">
                <label htmlFor="">
                  <strong>No cumple</strong>
                </label>
              </div>
              <div className="col-2 check-list-box text-center">
                <label htmlFor="">
                  <strong>Oportunidad de mejora</strong>
                </label>
              </div>
              <div className="col-3 check-list-box text-center">
                <label htmlFor="">
                  <strong>Observaciones</strong>
                </label>
              </div>
            </div>
            <div className="row p-0 m-0 gap-2 ">
              <div className="col-2 check-list-box text-center "></div>
              <div className="col-2 check-list-box text-center">
                <div className="d-flex gap-3 align-items-center justify-content-between">
                  <label htmlFor="">
                    {" "}
                    <strong>ISO 9001</strong>
                  </label>
                  <label htmlFor="">
                    <strong>ISO 45001</strong>
                  </label>
                </div>
              </div>
              <div className="col-1 check-list-box text-center"></div>
              <div className="col-1 check-list-box text-center"></div>
              <div className="col-2 check-list-box text-center"></div>
              <div className="col-3 check-list-box text-center"></div>
            </div>
            {reqs?.length > 0
              ? reqs.map((req, index) => (
                  <div className="row p-0 m-0 gap-2 " key={index}>
                    <div className="col-2  text-center ">
                      <label htmlFor="">
                        <textarea
                          className="form-control"
                          {...register(`pregunta${index}`, { required: true })}
                        ></textarea>
                      </label>
                    </div>
                    <div className="col-2  text-center">
                      <div className="d-flex gap-3 align-items-center justify-content-between">
                        <label htmlFor="">
                          {req.type === 801 ? req.article : "N/A"}
                        </label>
                        <label htmlFor="">
                          {req.type === 802 ? req.article : "N/A"}
                        </label>
                      </div>
                    </div>
                    <div className="col-1  text-center">
                      <label htmlFor="">
                      
                        <input
                          type="checkbox"
                          style={{ width: "30px", height: "30px" }}
                          {...register(`cumple${index}`)}

                          className="form-check-input"
                        />
                      </label>
                    </div>
                    <div className="col-1  text-center">
                      <label htmlFor="">
                        <input
                          type="checkbox"
                          style={{ width: "30px", height: "30px" }}
                          className="form-check-input"
                          {...register(`nocumple${index}`)}

                        />
                      </label>
                    </div>
                    <div className="col-2  text-center">
                      <label htmlFor="">
                        <input
                          type="checkbox"
                          style={{ width: "30px", height: "30px" }}
                          className="form-check-input"
                          {...register(`mejora${index}`)}

                        />
                      </label>
                    </div>
                    <div className="col-3  text-center">
                      <label htmlFor="">
                        <textarea className="form-control"
                          {...register(`observacion${index}`, { required: true })}
                          ></textarea>
                      </label>
                    </div>
                  </div>
                ))
              : "No hay requisitos a verificar"}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckList;

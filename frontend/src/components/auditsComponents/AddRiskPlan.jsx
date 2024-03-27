import React, { useState } from "react";

import { GrClose } from "react-icons/gr";

function AddRiskPlan({ close, callback }) {
  const [risk, setRisk] = useState("");
  const [plan, setPlan] = useState("");
  const saveRisk = () => {
    if (!risk || risk === "") {
      return swal.fire("El campo de riesgo no puede estar vacio", "", "info");
    }

    if (!plan || plan === "") {
      return swal.fire(
        "El campo de plan de contingencia no puede estar vacio",
        "",
        "info"
      );
    }
    const data = {
      risk,
      plan,
    };
    callback(data);
    setPlan("");
    setRisk("");
    close();
  };
  return (
    <div className="add-risk" id="add-risk">
      <div className="card shadow p-4 ">
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <p className="m-0 fw-bold text-center">
            Añadir riesgo y plan de contingencia
          </p>
          <button
          type="button"
            className="btn mb-2"
            onClick={() => {
              close();
            }}
          >
            <GrClose size={18} />
          </button>
        </div>
        <div className="d-flex flex-column gap-2">
          <input
            type="text"
            className="form-control"
            value={risk}
            onChange={(e) => {
              setRisk(e.target.value);
            }}
            placeholder="Riesgo..."
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Plan de contingencia"
            required
            value={plan}
            onChange={(e) => {
              setPlan(e.target.value);
            }}
          />
          <button type="button" className="btn btn-dark" onClick={saveRisk}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRiskPlan;

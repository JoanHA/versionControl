import React, { useEffect, useState } from "react";
import Select from "react-select";
import { createReq, getCriteriaTypes } from "../../api/AuditAPI/process";
function AddProcess({ options, onChange, type,cb }) {
  const [adding, setAdding] = useState(false);
  const [criteriOpt, setCriteriaOpt] = useState([]);
  const [name, setName] = useState("");
  const [types, setTypes] = useState(type);
  const [article, setArticle] = useState("");
  const getcriteria = async () => {
    try {
      const res = await getCriteriaTypes();

      setCriteriaOpt(res.data);
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    getcriteria();
  }, []);
  const clean =()=>{
    setName("");
    setArticle("");
  }
  const saveCriterio =async ()=>{
    const errors = [];
    if (name ==="") errors.push("<p className='m-0'>El campo nombre no puede estar vacio </p>");
    if (types === "") errors.push("<p className='m-0'>El campo tipo no puede estar vacio </p>")
    if (article === "") errors.push("<p className='m-0'>El campo articúlo no puede estar vacio </p>")
    if (errors.length > 0 ) return swal.fire("Espera!","".concat(errors.map(e=>e)).replaceAll(","," "),"info");

    const data = {
        name,
        article,
        type:types
    }
try {
    const res = await createReq(data);
    swal.fire(res.data,"","success")
    cb();
} catch (error) {
    swal.fire(error.response.data, "", "error");
}
  }
  return (
    <>
      <div className="d-flex flex-row gap-1 w-100 align-items-center">
        <div className="flex-fill">
          <Select
            options={options}
            isMulti
            closeMenuOnSelect={false}
            onChange={onChange}
          ></Select>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              setAdding(true);
              
            }}
          >
            +
          </button>
        </div>
      </div>

      {adding && (
        <div
          className="w-100 top-0 start-0 d-flex align-items-center justify-content-center  vh-100 position-fixed z-3"
          style={{ backgroundColor: " #24242449" }}
        >
          <div className="card flex-fill mx-4 " style={{maxWidth:"50rem"}}>
            <div className="card-header d-flex flex-row justify-content-between">
              <span>Agregar requisito</span>{" "}
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                    clean();
                  setAdding(false);
                }}
              ></button>
            </div>
            <div className="card-body">
              <div>
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  defaultValue={name}
                  placeholder="Requisito de la norma..."
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label>Articulo</label>
                <input type="text" className="form-control form-control-sm" placeholder="1.9, 20.0..."  defaultValue={article} onChange={(e)=>{setArticle(e.target.value)}}/>
              </div>
              <div>
                <label>Tipo de criterio</label>
                <select
                  className="form-select form-select-sm"
                  defaultValue={type}
                  onChange={(e) => {
                    setTypes(e.target.value);
                  }}
                >
                  <option value="" disabled>Selecciona criterio</option>
                  {criteriOpt &&
                    criteriOpt.map((c) => (
                      <option value={c.id} key={c.id}>
                        {c.name}{" "}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <button type="button" className="btn btn-primary mt-2" onClick={saveCriterio}>
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddProcess;

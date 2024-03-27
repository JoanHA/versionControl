import React, { useEffect, useState } from "react";
import Select from "react-select";
import { GrClose } from "react-icons/gr";
import { getAllInspectors, getInpectorRoles } from "../../api/AuditAPI/inspectorsAPI";

function AddInspector({ close, callback, inspectors }) {
  const [inspector, setInspector] = useState([]);
  const [options,setOption] = useState([])
  const [rol, setRol] = useState([]);
  const saveInspector = () => {
    if (inspector.length<1) {
      return swal.fire("El campo de auditor no puede estar vacio", "", "info");
    }

    if (rol.length < 1) {
      return swal.fire("El campo de rol no puede estar vacio", "", "info");
    }
    const data = {
      inspector,
      rol,
    };
    callback(data);
    setInspector("");
    setRol("");
    close();
  };
  useEffect(()=>{
    const getRol = async ()=>{
        const res = await getInpectorRoles();
        const datos = res.data.map((e)=>{
            const option ={
                label: `(${e.initials}) - ${e.name}`,
                value:e.id
            }
            return option

        })
        setOption(datos)
    }
    getRol()
  },[])
  return (
    <div className="add-risk" id="">
      <div className="card shadow p-4 " style={{ minWidth: "400px" }}>
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <p className="m-0 fw-bold text-center">Añadir auditor y su rol</p>
          <button
            type="button" 
            className="btn mb-2"
            onClick={() => {
              close();
            }}
          >
            {/* auditor principal*/}
            <GrClose size={18} />
          </button>
        </div>
        <div className="d-flex flex-column gap-2">
          <Select options={inspectors} onChange={setInspector}></Select>
          <Select options={options} onChange={setRol}></Select>
          <button
            type="button"
            className="btn btn-dark"
            onClick={saveInspector}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddInspector;

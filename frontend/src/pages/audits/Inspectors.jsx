import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { getAllInspectors } from "../../api/AuditAPI/inspectorsAPI";
import AuditTable from "../../components/auditsComponents/AuditTable";
import ViewInspector from "./inspectors/ViewInspector";

function Inspectors() {
  const columns = [
    {
      header: "Nombre",
      accessorKey: "full_name",
    },
    {
      header: "Cargo",
      accessorKey: "job",
    },
    {
      header: "Fecha ingreso",
      accessorKey: "enroll_date",
    },
    {
      header: "Estado",
      accessorKey: "status",
    },
  ];
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [display, setDisplay] = useState("none");
  const getInspectors = async () => {
    try {
      const res = await getAllInspectors();

      const datos = res.data?.map((e) => {
        e.enroll_date = e.enroll_date?.split("T")[0];
        e.status = e.status === 1 ? "Activo" : "Inactivo";
        return e;
      });

      setData(datos);
    } catch (error) {
      console.log(error)
      swal.fire(error.response.data, "", "error");
    }
  };

  useEffect(() => {
    getInspectors();
  }, []);
  return (
    <div>
       <ViewInspector
            display={display}
            close={() => {
              setDisplay("none");
            }}
            id={id}
          ></ViewInspector>
      <div className="titleHeader">Auditores internos</div>
      <div className="px-4">
        <div className="mb-2">
          <button className="btn btn-primary btn-sm">
            <Link to={"/audits/inspectors/create"} className="text-white">
              Agregar auditor
            </Link>
          </button>
        </div>
       
         
        
        <AuditTable
          columns={columns}
          data={data}
          callback={(id) => {
            setDisplay("flex");
            setId(id)
          }}
        ></AuditTable>
      </div>
    </div>
  );
}

export default Inspectors;

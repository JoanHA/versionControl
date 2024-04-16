import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import { getProgram } from "../../api/AuditAPI/auditProgramsAPI";
import ProcessTable from "../../components/auditsComponents/ProcessTable";
function AuditPrograms() {
  const columns = [
    { header: "Fecha creacion", accessorKey: "created_at" },
    { header: "Objetivo", accessorKey: "objective" },
    {
      header: "Alcance",
      accessorKey: "scope",
    },
    {
      header: "Estado",
      accessorKey: "status_name",
    },
   
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPrograms = async () => {
      const res = await getProgram();
    
      res.data.map((d) => {
        d.created_at = d.created_at.split("T")[0];
        return d;
      });
      //fecha- tipo - estado
      setData(res.data);
    };
    getPrograms();
  }, []);
  return (
    <div className="px-2">
      <div className="titleHeader text-uppercase">Auditorias y autoinspecciones</div>
      <div className="px-3">
        <Link
          className="text-white btn btn-primary btn-sm "
          to={"/audits/programs/create"}
        >
          Crear programa 
        </Link>

        <div className="">
          <ProcessTable columns={columns} data={data}></ProcessTable>
        </div>
      </div>
    </div>
  );
}

export default AuditPrograms;

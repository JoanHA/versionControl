import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { getCheckLists } from "../../../api/AuditAPI/checklistAPI";
import AuditTable from "../../../components/auditsComponents/AuditTable";
function CheckLists() {
  const [data, setData] = useState([]);
  const columns = [
    {
      header: "Fecha",
      accessorKey: "date",
    },
    {
      header: "Auditor",
      accessorKey: "leader",
    },
    {
      header: "Proceso",
      accessorKey: "process_name",
    },
    {
      header: "Estado",
      accessorKey: "status_name",
    },
  ];
  const getChecks = async () => {
    const res = await getCheckLists();
   
    setData(res.data);
  };
  useEffect(() => {
    getChecks();
  }, []);
  return (
    <div className="px-3">
      <div className="titleHeader">Listas de chequeo</div>
      <div>
        <AuditTable
          columns={columns}
          data={data}
          options={false}
          editType={"audits/checklist"} 
          view={true}
          editName={"checklist"}
        ></AuditTable>
      </div>
    </div>
  );
}

export default CheckLists;

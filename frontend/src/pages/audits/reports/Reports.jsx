import React, { useEffect, useState } from "react";
import { getAllReports } from "../../../api/AuditAPI/reportsAPI";
import ProcessTable from "../../../components/auditsComponents/ProcessTable"

function Reports() {
  const columns = [
    { header: "Fecha ", accessorKey: "date" },
    { header: "Proceso", accessorKey: "name" },
    {
      header: "Auditor lider",
      accessorKey: "leader",
    },
    {
      header: "Objetivo",
      accessorKey: "objective",
    },
  ];
  const [data, setData] = useState([]);

  const bringData = async () => {
    try {
      const res = await getAllReports();
     
      setData(res.data)
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    bringData()
  }, []);
  return <div>
    <div className="titleHeader">Reporte de hallagos</div>
    <div
    className="table-responsive">
        <ProcessTable  data={data} columns={columns} edit="viewReport" name={"Ver reporte"}> </ProcessTable>
    </div>
  </div>;
}

export default Reports;

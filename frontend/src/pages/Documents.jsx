import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { getAllDocuments } from "../api/documentsAPI";
import { convertNumber } from "../lib/helper";
function Documents() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      const res = await getAllDocuments();

      const CleanData = convertNumber(res.data);
  
      setData(CleanData);
    };
    getdata();
  }, []);
  const columns = [
    {
      header: "Código",
      accessorKey: "code",
    },
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Tipologia",
      accessorKey: "typology_name",
    },
    {
      header: "Proceso",
      accessorKey: "process_name",
    },
    {
      header: "Versión",
      accessorKey: "version",
    },
    {
      header: "Ultima revisión",
      accessorKey: "last_revision",
    },
  ];
  return (
    <div>
      <div className="titleHeader text-center py-1">Listado maestro</div>
      <div>
        <Table columns={columns} data={data} ></Table>
      </div>
    </div>
  );
}

export default Documents;

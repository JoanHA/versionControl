import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { getAllDocuments } from "../api/documentsAPI";
import { convertNumber } from "../lib/helper";
import DocTable from "./DocTable";
import Header from "../layout/Header";
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
    <Header>

<div>
      <div className="titleHeader text-center " style={{textTransform:"uppercase"}}>Listado maestro de documentos </div>
      <div className="">
        {/* <Table columns={columns} data={data} ></Table> */}
        <DocTable ></DocTable>
      </div>
    </div>
    </Header>
  
  );
}

export default Documents;

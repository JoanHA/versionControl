import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getChanges } from "../../api/changes";
import { convertChangesVersion } from "../../lib/helper";
import Header from "../../layout/Header";

function ViewChanges() {
  const columns = [
    {
      header: "Código",
      accessorKey: "code",
    },
    {
      header: "Nombre del documento",
      accessorKey: "name",
    },
    {
      header: "Solicitante",
      accessorKey: "claimant",
    },
   
    {
      header: "Fecha de cambio",
      accessorKey: "created_at",
    },
    {
      header: "Nueva versión",
      accessorKey: "new_version",
    },
    {
      header: "Aprueba",
      accessorKey: "aproved_by",
    },
  ];
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await getChanges();
    const datos = convertChangesVersion(res.data);
    setData(datos);
  };
  useEffect(() => {
    
    getData();
  }, []);
  return (
    <Header><div>
    <div className="titleHeader ">Cambios realizados</div>
    <Table 
      columns={columns}
      data={data} 
      options={false} 
      details={true}
      cb={getData}
      ></Table>
  </div></Header>
    
  );
}

export default ViewChanges;

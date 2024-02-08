import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getChanges } from "../../api/changes";
import { convertChangesVersion, convertNumber } from "../../lib/helper";

function ViewChanges() {
  const columns = [
    {
      header: "Código",
      accessorKey: "code",
    },
    {
      header: "Solicitante",
      accessorKey: "claimant",
    },
    {
      header: "Documento",
      accessorKey: "name",
    },
    {
      header: "Justificación",
      accessorKey: "reason",
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
  useEffect(() => {
    const getData = async () => {
      const res = await getChanges();
      const datos = convertChangesVersion(res.data);
      setData(datos);
    };
    getData();
  }, []);
  return (
    <div>
      <div className="titleHeader ">Cambios realizados</div>
      <Table 
        columns={columns}
        data={data} 
        options={false} 
        details={true}
        ></Table>
    </div>
  );
}

export default ViewChanges;

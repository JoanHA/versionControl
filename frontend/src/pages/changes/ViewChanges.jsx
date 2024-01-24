import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getChanges } from "../../api/changes";

function ViewChanges() {
  const columns = [
    {
      header: "Codigo",
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
      header: "Nueva version",
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
      console.log(res.data);
      //Agregarle el 0 a la version del equipo
      const datos = res.data.map((element) => {
        const e = { ...element };
        e.new_version =
          e.new_version < 10 ? `0${e.new_version}` : e.new_version;
        return e;
      });

      setData(datos);
    };
    getData();
  }, []);
  return (
    <div>
      <div className="titleHeader py-1">Cambios realizados</div>
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

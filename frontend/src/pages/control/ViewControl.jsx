import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Archived from "./Archived";
import { getArchived } from "../../api/changes";

function ViewControl() {
  const columns = [
    {
      header: "Código",
size:200,
      accessorKey: "code",
    },
    {
      header: "Nombre documento",
      size: 600,
      accessorKey: "name",
    },
    {
      header: "Responsable",

      accessorKey: "responsible",
    },
    {
      header: "Guardado en",

      accessorKey: "saved_in",
    },
    {
      header: "Guardado como",

      accessorKey: "saved_format",
    },
    {
      header: "Estado",

      accessorKey: "version",
    },
    {
      header: "Disposición final",

      accessorKey: "last_move_name",
    },
  ];
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await getArchived();
    const datos = res.data.map((doc) => {
      if (doc.version === 0) {
        doc.version = "OBSOLETO";
      } else {
        doc.version = "Activo";
      }
      return doc;
    });
    setData(datos);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="titleHeader ">Retención documental</div>

      <Table
        columns={columns}
        data={data}
        options={false}
        btnDetails={{ doc: data, text: "Detalles" }}
        cb={getData}
      ></Table>
    </div>
  );
}

export default ViewControl;

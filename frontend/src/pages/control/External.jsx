import React, { useEffect, useState } from "react";
import { getExternal } from "../../api/changes";
import Table from "../../components/Table";
import Header from "../../layout/Header";
function External() {
  const columns = [
    {
      header: "Responsable",
      accessorKey: "responsible",
    },
    {
      header: "Nombre documento",
      accessorKey: "documentName",
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
      header: "Disposición final",
      accessorKey: "last_move_name",
    },
  ];
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await getExternal();

    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Header>
      {" "}
      <div>
        <div className="titleHeader">Documentos externos</div>

        <Table
          columns={columns}
          data={data}
          options={false}
          btnDetails={{ doc: data, text: "Detalles", external: true }}
          cb={getData}
        ></Table>
      </div>
    </Header>
  );
}

export default External;

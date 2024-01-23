import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Archived from "./Archived";
import { getArchived } from "../../api/changes";

function ViewControl() {
  const columns = [
    {
      header: "Codigo",
      accessorKey: "code",
    },
    {
      header: "responsable",
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
      header: "Disposicion final",
      accessorKey: "last_move_name",
    },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getArchived();
      setData(res.data);

    };
    getData();
  }, []);
  return (
    <div>
      <Table
        columns={columns}
        data={data}
        options={false}
        btnDetails={{doc:data,text:"Ver detalles"}}
      ></Table>
    </div>
  );
}

export default ViewControl;

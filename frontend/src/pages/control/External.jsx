import React, { useEffect, useState } from 'react'
import { getExternal } from '../../api/changes';
import Table from '../../components/Table';
function External() {
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
          const res = await getExternal();
          setData(res.data);
          console.log(res.data)
    
        };
        getData();
      }, []);
      return (
        <div>
                <div className="titleHeader py-1">Documentos externos</div>
    
          <Table
            columns={columns}
            data={data}
            options={false}
            btnDetails={{doc:data,text:"Ver detalles"}}
          ></Table>
        </div>
      );
}

export default External
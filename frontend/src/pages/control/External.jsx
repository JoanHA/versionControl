import React, { useEffect, useState } from 'react'
import { getExternal } from '../../api/changes';
import Table from '../../components/Table';
function External() {
    const columns = [
       
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
          header: "Disposición final",
          accessorKey: "last_move_name",
        },
      ];
      const [data, setData] = useState([]);
    
      useEffect(() => {
        const getData = async () => {
          const res = await getExternal();
          setData(res.data);

    
        };
        getData();
      }, []);
      return (
        <div>
                <div className="titleHeader">Documentos externos</div>
    
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
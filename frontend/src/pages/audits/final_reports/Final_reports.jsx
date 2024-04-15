import React, { useState } from 'react'
import GeneralTable from '../../../components/auditsComponents/GeneralTable';

export default function Final_reports() {
  
  const [data,setData] = useState({});
  const columns= [
    {
      header:"Objetivo",
      accessorKey:"",  
    },
    {
      header:"Fecha de auditoria",
      accessorKey:"",  
    },
    {
      header:"Auditor lider",
      accessorKey:"",  
    },


  ]
  return (
    <div className='px-3'>
      <div className="titleHeader">Informes finales</div>
      <GeneralTable columns={columns} data={data}/>

    </div>
  )
}

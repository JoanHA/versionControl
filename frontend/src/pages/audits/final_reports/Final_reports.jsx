import React, { useEffect, useState } from 'react'
import GeneralTable from '../../../components/auditsComponents/GeneralTable';
import { getFinalReports } from '../../../api/AuditAPI/final_report';

export default function Final_reports() {
  
  const [data,setData] = useState({});
  const columns= [
    {
      header:"Objetivo",
      accessorKey:"objective",  
    },
    {
      header:"Fecha de auditoria",
      accessorKey:"validity",  
    },
    {
      header:"Auditor lider",
      accessorKey:"leader",  
    },

  ]
  const getFinal = async()=>{
    const res = await getFinalReports();
    setData(res.data)
    console.log(res.data)
  }
  useEffect(()=>{
    getFinal();
  },[])
  return (
    <div className='px-3'>
      <div className="titleHeader">Informes finales</div>
      <GeneralTable columns={columns} data={data} options={false} justView={true} editType={"audits/plans/view"}/>

    </div>
  )
}

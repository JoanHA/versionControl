import React, { useEffect, useState } from "react";
import AddProcess from "../../../components/auditsComponents/AddProcess";
import { createProcess, editProcess, getAllReq, getOneProcess } from "../../../api/AuditAPI/process";
import { useForm } from "react-hook-form";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Table from "./../../../components/Table"
function CreateProcess() {
  //Options
  const [iso9, setIso9] = useState([]);
  const [iso4, setIso4] = useState([]);
  const [decreto, setDecreto] = useState([]);
  //Values
  const [iso9001, setIso9001] = useState([]);
  const [iso4005, setIso45001] = useState([]);
  const [decreto_1072, setDecreto_1072] = useState([]);
const [reqs,setReqs]  = useState([]);
const columns = [
  {
    accessorKey:"id",
    header:"Id"
  },
  {
    accessorKey:"article",
    header:"Articulo"
  },
  {
    accessorKey:"type_name",
    header:"Tipo"
  }
]
  const params = useParams();
  const bringReqs = async () => {
    try {
      const res = await getAllReq();
      const iso1 = [];
      const iso2 = [];
      const decreto1 = [];
      res.data.map((e) => {
        switch (e.type) {
          case 803:
            decreto1.push({
              value: e.id,
              label: `(${e.article}) ${e.name}`,
            });
            break;
          case 802:
            iso2.push({ value: e.id, label: `(${e.article}) ${e.name}` });
            break;
          case 801:
            iso1.push({ value: e.id, label: `(${e.article}) ${e.name}` });
          default:
            break;
        }
      });
      setIso9(iso1);
      setIso4(iso2);
      setDecreto(decreto1);
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  const bringInfo = async ()=>{
    try {
      const res = await getOneProcess(params.id);
      console.log(res.data)
 setReqs(res.data[0].articles)
      reset({
        name: res.data[0].name
      })
    } catch (error) {
      swal.fire(error.response.data, "", "error");
      
    }
  }
  useEffect(() => {
    bringReqs();
    if(params.id){
      bringInfo()
    }
  }, []);
  const clean = () => {
    setIso9001("");
    setIso45001("");
    setDecreto_1072("");
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.iso9 = iso9001;
    data.iso4 = iso4005;
    data.decreto = decreto_1072;
    try {
      if (params.id) {
        return editProcesses( data)        
      }
      const res = await createProcess(data);
      swal.fire(res.data, "", "success");
      clean();
      reset();
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  const editProcesses = async(data)=>{
    try {
      const res = await editProcess(params.id,data);
      swal.fire(res.data, "", "success");
      clean();
      reset();
      await bringInfo();
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  }
  return (
    <div className="px-3 py-2">
      <div className="titleHeader">Crear proceso de auditoria</div>
      <div>
        <FaArrowCircleLeft
          size={20}
          onClick={() => {
            history.back();
          }}
        />
      </div>
      <div className="py-2">
       
          <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label>Nombre del proceso</label>
            </div>
            <div>
              <input
                type="text"
                placeholder="Nombre..."
                className="form-control"
                {...register("name", { required: true })}
              />
            </div>
          </div>
      <div className="">
            <div className="mt-2">
              <h4 className="m-0 mb-2">{params.id ? "Agregar requisitos": "Requisitos"}</h4>
            </div>
            <div className="row ">
              <div className="col-6">
                <label htmlFor="">ISO 9001</label>
                <div className="">
                  <AddProcess
                    options={iso9}
                    onChange={setIso9001}
                    type={801}
                    cb={bringReqs}
                  />
                </div>
              </div>
              <div className="col-6">
                <label htmlFor="">ISO 45001</label>
                <div>
                  <AddProcess
                    options={iso4}
                    onChange={setIso45001}
                    cb={bringReqs}
                    type={802}
                  />
                </div>
              </div>
              <div className="col-6">
                <label htmlFor="">Decreto 1072</label>
                <div>
                  <AddProcess
                    options={decreto}
                    onChange={setDecreto_1072}
                    cb={bringReqs}
                    type={803}
                  />
                </div>
              </div>
            </div>
            <div className="my-3">
              <button className="btn btn-success">{ params.id ? "Editar" :"Crear"}</button>
            </div>
          </div>
          <h2>Requisitos ya añadidos</h2>
          <Table columns={columns} data={reqs} options={false}></Table>
          
         

        </form>
       
        
      </div>
    </div>
  );
}

export default CreateProcess;

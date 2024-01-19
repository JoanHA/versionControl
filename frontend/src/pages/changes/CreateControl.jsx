import React, { useEffect, useState } from "react";
import SelectInput from "../../components/Select";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { getAllDocuments } from "../../api/documentsAPI";
import { getLastMove } from "../../api/documentsAPI";
function CreateControl() {
    const {register,handleSubmit,reset,formState:{errors}}= useForm()
    const [codigos, SetCodigos] = useState([]);
    const [data, setData] = useState([]);
    const [id,setId] = useState(null)
    const [lastMove,setLastMove] = useState([])
    const onSubmit = async(values)=>{
        console.log(values)
    }
    const handleChange = (e) => {
        setId(e.value);
        const selectedValue = data.filter((element) => element.id === e.value);
        reset({
            documentName:selectedValue[0].name
        })
      };
      const selectChanged = (e)=>{
        console.log(e)
      }
      const getLastMoves = async()=>{
        try {
            const res = await getLastMove()
            const moves = []
            res.data.forEach(d=>{
              moves.push({
                value:d.id,
                label:d.name
              })
            })
           setLastMove(moves)
        } catch (error) {
            
        }
      }
      const getCodes = async () => {
        try {
          const res = await getAllDocuments();
          setData(res.data);
          const codes = [];
          res.data.forEach((e) => {
            codes.push({
              value: e.id,
              label: e.code,
            });
          });
          SetCodigos(codes);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(()=>{
        getCodes()
        getLastMoves()
      },[])
  return (
    <div>
      <div className="titleHeader">Control de registros</div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row px-3">
        <div className="col-12 col-md-6">
          <div className="row gap-3">
            <div className="col-12 row">
              <div className="col-4">
                <label>Código</label>
              </div>
              <div className="col-8">
                <Select {...register("codigo",{required:true})} onChange={handleChange} options={codigos}></Select>
              </div>
            </div>
            <div className="col-12 row">
              <div className="col-4">
                <label>Nombre del registro</label>
              </div>
              <div className="col-8">
                <input

                  type="text"
                  {...register("documentName",{required:true})}
                  className="form-control"
                  placeholder="Nombre del registro..."
                />
              </div>
            </div>
            <div className="col-12 row">
              <div className="col-4">
                <label>Responsable de archivo</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  {...register("responsible",{required:true})}
                  className="form-control"
                  placeholder="Nombre de responsable..."
                />
              </div>
            </div>
            <div className="col-12 row">
              <div className="col-4">
                <label>Donde se archiva</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  {...register("saved_in",{required:true})}
                  className="form-control"
                  placeholder="Digital, Fisico..."
                />
              </div>
            </div>
            <div className="col-12 row">
              <div className="col-4">
                <label>Como se archiva</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  {...register("saved_format",{required:true})}
                  className="form-control"
                  placeholder="Alfabetico, Consecutivo etc..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row gap-3">
            <div className="col-12 row gap-3">
              <div className="col-12 ">
                <label htmlFor="">Tiempo de retención</label>
              </div>
              <div className="col-12 row  ">
                <div className="col-4 me-2">
                  <label htmlFor="">Archivo activo</label>
                </div>
                <div className="col-7">
                  <input className="form-control" type="text" {...register("actived_saved",{required:true})} />
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-4 me-2">
                  <label htmlFor="">Archivo Inactivo</label>
                </div>
                <div className="col-7">
                  {" "}
                  <input className="form-control" type="text" {...register("inactive_saved",{required:true})} />
                </div>
              </div>
            </div>
            <div className="col-12 row">
              <div className="col-4">
                <label htmlFor="">Disposición final</label>
              </div>
              <div className="col-7">
                <SelectInput onChange={selectChanged} data={lastMove}></SelectInput>
              </div>
            </div>
         
          </div>
        </div>
        <div className="col-12 col-md-6 mt-3">
          <div>
            <button className="btn btn-success rounded shadow">
              Registrar archivo
            </button>
          </div>
        </div>
      </div>
      </form>
     
    </div>
  );
}

export default CreateControl;

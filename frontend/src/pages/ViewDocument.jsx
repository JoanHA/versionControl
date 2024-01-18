import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getOneDocument } from "../api/documentsAPI";
import { Link } from "react-router-dom";
function ViewDocument() {
  const params = useParams();
  const { register, reset, handleSubmit } = useForm();
  const [isRegister,setIsRegister] = useState(false)
  const [data, setData] = useState({});
  const getData = async () => {
    const res = await getOneDocument(params.id);
  
    setData(res.data[0]);
    const code = res.data[0].code
    if(code.substring(0,1).toUpperCase()==="R"){
      setIsRegister(true)
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="titleHeader text-center py-1">Información del archivo {data.code}</div>
      
      <div className="container mx-auto row gap-2">
        <div className="col-12 col-md-5" >
          <label className="titleLabel">Código:</label>
          <label className="inputLabel">{data.code}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Nombre del documento:</label>
          <label className="inputLabel">{data.name}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Tipologia:</label>
          <label className="inputLabel">{data.typology_name}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Proceso:</label>
          <label className="inputLabel">{data.process_name}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Versión:</label>
          <label className="inputLabel">
            {data.version >= 10 ? data.version : `0${data.version}`}
          </label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Ultima revisión:</label>
          <label className="inputLabel">{data.last_revision}</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Detalle:</label>
          <label className="inputLabel">{data.comments}</label>
        </div>
        <div>
        <Link className="btn btn-sm btn-primary mt-2 mx-1">Agregar cambio</Link>
        <Link className="btn btn-sm btn-warning mt-2 mx-1">Editar archivo</Link>
        <Link className="btn btn-sm btn-success mt-2 mx-1">Agregar registro</Link>
      </div>
      </div>
      <div className="titleHeader text-center py-1 mt-3"> Historico de cambios del {data.code}</div>
      <div className="container mx-auto row gap-2">
        <div className="col-12 col-md-5">
          <label className="titleLabel">Justificación:</label>
          <label className="inputLabel">...</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Persona que solicita el cambio:</label>
          <label className="inputLabel">...</label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel"> Nueva Versión:</label>
          <label className="inputLabel">
            ...
          </label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Aprobado por:</label>
          <label className="inputLabel"></label>
        </div>
        <div className="col-12 col-md-5">
          <label className="titleLabel">Detalle de la modificación:</label>
          <label className="inputLabel">...</label>
        </div>
      </div>

    </div>
  );
}

export default ViewDocument;

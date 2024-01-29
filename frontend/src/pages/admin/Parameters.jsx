import React, { useEffect, useState } from "react";
import { getAllParameters } from "../../api/parameters";
import "../../assets/CSS/parameters.css";
import { IoAddCircleSharp } from "react-icons/io5";
import AddParams from "../../components/AddParams";
function Parameters() {
  const [lastMove, setLastMove] = useState([]);
  const [typology, setTypology] = useState([]);
  const [process, setProcess] = useState([]);
  const [codeLetter, setCodeLetter] = useState([]);
  const [initials, setInitials] = useState([]);
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [typeId, setTypeId] = useState(null);
  const getAll = async () => {
    try {
      const res = await getAllParameters();
      const disposicionFinal = [];
      const tipologia = [];
      const proceso = [];
      const inciiales = [];
      const letras = [];
      res.data.map((element) => {
        element.paramtype_id === 1
          ? disposicionFinal.push(element)
          : element.paramtype_id === 2
          ? tipologia.push(element)
          : element.paramtype_id === 3
          ? proceso.push(element)
          : element.paramtype_id === 4
          ? letras.push(element)
          : element.paramtype_id === 5
          ? inciiales.push(element)
          : null;
      });
      setCodeLetter(letras);
      setInitials(inciiales);
      setLastMove(disposicionFinal);
      setProcess(proceso);
      setTypology(tipologia);
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  const editParams = (id, name, paramType) => {
    console.log("Id:", id, "Name:" + name, "Parametro:", paramType);
  };
  const newParam = (entername, enterid) => {
    setTypeId(enterid);
    setName(entername);
    document.getElementById("AddParams").classList.remove("d-none");
    document.getElementById("AddParams").style.display = "block";
    document.getElementById("AddParams").style.opacity = 1;
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div>
      <AddParams name={name} typeid={typeId} callback={getAll} id={id} />
      <div className="titleHeader">Gestión de parametros</div>
      <div className="row gap-2 justify-content-center">
        <div className="col-lg-5 col-sm-12">
          <div className="">
            <div className="paramTitle">
              Disposición final
              <button
                className="addbtn"
                type="button"
                onClick={() => {
                  newParam("Disposición final", 1);
                }}
              >
                <IoAddCircleSharp size={23} fill="#fff" />
              </button>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              {lastMove &&
                lastMove.map((e) => (
                  <div
                    className="paramLinks"
                    key={e.id}
                    onClick={() => {
                      editParams(e.id, "Disposición final", e.paramtype_id);
                    }}
                  >
                    {e.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-sm-12">
          <div className="">
            <div className="paramTitle">
              Procesos{" "}
              <button
                className="addbtn"
                type="button"
                onClick={() => {
                  newParam("Proceso", 3);
                }}
              >
                <IoAddCircleSharp size={23} fill="#fff" />
              </button>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              {process &&
                process.map((e) => (
                  <div
                    className="paramLinks"
                    key={e.id}
                    onClick={() => {
                      editParams(e.id, "Disposición final", e.paramtype_id);
                    }}
                  >
                    {e.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-sm-12">
          <div className="">
            <div className="paramTitle">
              Tipologias{" "}
              <button
                className="addbtn"
                type="button"
                onClick={() => {
                  newParam("Tipologia", 2);
                }}
              >
                <IoAddCircleSharp size={23} fill="#fff" />
              </button>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              {typology &&
                typology.map((e) => (
                  <div
                    className="paramLinks"
                    key={e.id}
                    onClick={() => {
                      editParams(e.id, "Disposición final", e.paramtype_id);
                    }}
                  >
                    {e.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-sm-12">
          <div className="">
            <div className="paramTitle">
              Iniciales de proceso{" "}
              <button
                className="addbtn"
                type="button"
                onClick={() => {
                  newParam("Iniciales de proceso", 5);
                }}
              >
                <IoAddCircleSharp size={23} fill="#fff" />
              </button>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              {initials &&
                initials.map((e) => (
                  <div
                    className="paramLinks"
                    key={e.id}
                    onClick={() => {
                      editParams(e.id, "Disposición final", e.paramtype_id);
                    }}
                  >
                    {e.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-sm-12">
          <div className="">
            <div className="paramTitle">
              Iniciales de código{" "}
              <button
                className="addbtn"
                type="button"
                onClick={() => {
                  newParam("Iniciales de código", 1);
                }}
              >
                <IoAddCircleSharp size={23} fill="#fff" />
              </button>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              {codeLetter &&
                codeLetter.map((e) => (
                  <div
                    className="paramLinks"
                    key={e.id}
                    onClick={() => {
                      editParams(e.id, "Disposición final", e.paramtype_id);
                    }}
                  >
                    {e.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-sm-12">
          <div className="">
            <div className="paramTitle"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parameters;

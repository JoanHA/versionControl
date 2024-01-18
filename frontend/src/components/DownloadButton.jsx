import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx/xlsx.mjs";
import autoTable from "jspdf-autotable"
import jsPDF from "jspdf";


function DownloadButton({ data = [], filter }) {
  const [filtering, setFiltering] = useState([]);
  const [pathname, SetPathname] = useState("");
 
  useEffect(() => {
    const path = window.location.pathname;
    SetPathname(path);
  }, []);

  //Guardar datos
  const handleExcel = () => {
    Swal.fire({
      title: "Espera!",
      text: "Recuerda que si estan filtrando los datos, mientras mas especifico seas, mejor 😉",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const datos = getData();
        if (datos.length > 0) {
          const data = [];
          datos.forEach((element) => {
  
            if (pathname == "/equipments" ) {
              const equipo = {
                Nombre: element.name,
                Oficina: element.office,
                Serial: element.serial,
                Usuario: element.user_name,
                Ram: element.ram,
                Disco_duro: element.hard_disk,
                Sistema_operativo: element.system,
                Estado: element.statusName,
                Marca: element.paramName,
                Celular:element.phone,
                Ubicacion: element.location,
                Creado: element.bought_at.split("T")[0],
              }
              data.push(equipo);
            }else{
              const usuario = {
                Id: element.id,
                Identificacion: element.dni,
                Nombre: element.name,
                Email: element.email,
                Area: element.area,
                Sede: element.branch,
                Estado: element.status_name,
                Fecha_ingreso: element.created_at.split("T")[0],
              }
              data.push(usuario);
            }
            
         
          });
          const worksheet = XLSX.utils.json_to_sheet(data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
          XLSX.writeFile(workbook, `Reporte de ${pathname=="/equipments"? "Equipos":"Colaboradores"} filtrados.xlsx`);
        }
      }
      
    });
  };

  const handlePDF = () => {
    
    Swal.fire({
      title: "Espera!",
      text: "Recuerda que si estan filtrando los datos, mientras mas especifico seas, mejor 😉",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const datos = getData();
        if (datos.length > 0) {
          const data = [];
          datos.forEach((element) => {
            if (pathname == "/equipments")  {
              data.push( {
              Nombre: element.name,
              Oficina: element.office,
              Serial: element.serial,
              Usuario: element.user_name,
              Ram: element.ram,
              Disco_duro: element.hard_disk, 
              Sistema_operativo: element.system,
              Estado: element.statusName,
              Marca: element.paramName,
              Celular:element.phone,
              Ubicacion: element.location,
              Creado: element.bought_at.split("T")[0],
              });
            }else{
              data.push({
                Id: element.id,
                Identificacion: element.dni,
                Nombre: element.name,
                Email: element.email,
                Area: element.area,
                Sede: element.branch,
                Estado: element.status_name,
                Fecha_ingreso: element.created_at.split("T")[0],
              });
            } 
          });
          const doc = new jsPDF("l", "pt", "letter");
          var body = [];
          data.forEach((e, index) => {
            if (pathname == "/equipments" ) {
              body.push([
                e.Nombre,
                e.Oficina,
                e.Serial,
                e.Usuario,
                e.Ram,
                e.Disco_duro,
                e.Sistema_operativo,
                e.Estado,
                e.Marca,
                e.Celular,
                e.Ubicacion,
                e.Creado,
              ]);
            }else{
              body.push([
                e.Identificacion,
                e.Nombre,
                e.Email,
                e.Area,
                e.Sede,
                e.Estado,
                e.Fecha_ingreso,
              ]);
            }
          });
          var headers = [];
    if (pathname == "/equipments" ) {
      headers = [
        "Nombre",
        "Oficina",
        "Serial",
        "Nombre del responsable",
        "Ram",
        "Disco Duro",
        "Sistema Operativo",
        "Estado",
        "Marca",
        "Celular",
        "Ubicación",
        "Fecha de compra",
      ]
    }else{
      headers =[
        "Identificacion",
        "Nombre",
        "Email",
        "Area",
        "Sede",
        "Estado ",
        "Fecha ingreso"
      ]
    }
          var y = 20;
          doc.setLineWidth(1);
          // doc.text(240, y - 10, `Reporte de ${pathname=="/equipments"? "Equipos":"Colaboradores"} filtrados`);
          doc.autoTable({
            body: body,
            startY: y,
            head: [headers],
            theme: "striped",
            headStyles: {
              lineWidth: 0,
              fillColor: [223, 222,222],
              textColor: [0, 0, 0],
            
            },
          });

          doc.save(`Reporte de ${pathname=="/equipments"? "Equipos":"Colaboradores"} filtrados.pdf`);
        }
      }
    });
  };
  //Funcion para filtrar los datos
  const mapear = (map) => {
    var retorno = false;
   
   
    map.map((element) => {
      const datas = element.toString().toLowerCase();
      if (datas.match(filter.toLowerCase())) {
        retorno = true;
      }
    });
      return retorno
  };
  //obtener los datos Filtrados
  const getData = () => {
   
    if (filter) {
      
      if (data != null) {
       
        const FilteredData = data.filter((equip) => {
          const map = Object.values(equip).filter(Boolean);
          if (mapear(map)) {
            return true;
          }
        });
        
        setFiltering(FilteredData);
        if (FilteredData.length == 0) {
          return swal.fire(
            "No se encontraron datos para descargar",
            "",
            "error"
          );
        }
        return FilteredData;
      } else {
        return swal.fire("No se encontraron datos para descargar", "", "error");
      }
    } else {
      if (!data) {
        return swal.fire("No se encontraron datos para descargar", "", "error");
      }
      return data;
    }
  };
  return (
    <div
      className={
        pathname == "/equipments" || pathname == "/Workers"
          ? "d-block"
          : "d-none"
      }
    >
      <div className="btn-group" role="group" aria-label="Basic  example">
        <button
          type="button"
          className="btn btn-primary no-radius "
          onClick={handleExcel}
        >
          Descargar Excel
          <FaDownload className="mx-1" />
        </button>
        <button
          type="button"
          className="btn btn-secondary no-radius"
          onClick={handlePDF}
        >
          Descargar PDF
          <FaDownload className="mx-1" />
        </button>
      </div>
    </div>
  );
}

export default DownloadButton;

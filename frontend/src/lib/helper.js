import { lastChanges } from "../api/documentsAPI";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import logo from "../assets/IMG/LogoBioartPDF.png";
import logoIcontent from "../assets/IMG/logoIcontec.png";
export const convertNumber = (object) => {
  const newObject = [];
  object.forEach((d) => {
    try {
      d.last_revision = formatTimeStamp(d.last_revision);

      if (d.version === 0) {
        d.version = "OBSOLETO";
        return newObject.push(d);
      }
      if (d.version < 10) {
        d.version = `0${d.version}`;
        return newObject.push(d);
      }

      return newObject.push(d);
    } catch (error) {
      console.log(error);
    }
  });
  return newObject;
};
export const convertChangesVersion = (object) => {
  const newObject = [];
  object.forEach((d) => {
    try {
      d.created_at = formatTimeStamp(d.created_at);

      if (d.new_version === 0) {
        d.new_version = "OBSOLETO";
        return newObject.push(d);
      }
      if (d.new_version < 10) {
        d.new_version = `0${d.new_version}`;
        return newObject.push(d);
      }

      return newObject.push(d);
    } catch (error) {
      console.log(error);
    }
  });
  return newObject;
};

export const formatTimeStamp = (timeStamp) => {
  if (timeStamp === null || timeStamp === "") return null;

  const date = new Date(timeStamp);
  // Obtiene los componentes de la fecha (año, mes y día)
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // Sumamos 1 para que enero sea 1, febrero 2, etc.
  const day = date.getUTCDate();

  // Formatea la fecha como "YYYY/MM/DD"
  const formattedDate = `${year}/${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}`;
  return formattedDate;
};

export const formatDate = (Stringdate) => {
  if (Stringdate == null || Stringdate == "") {
    return null;
  }
  //Recibe YYYY/MM/DD

  const año = Stringdate.toString().substring(0, 4);
  const mes = Stringdate.toString().substring(5, 7);
  const dia = Stringdate.toString().substring(8, 10);
  const fecha = `${año}-${mes}-${dia}`;
  return fecha;
};
export const descargarPDF = (datosFiltrados)=>{
try {
  const doc = new jsPDF("l");
  var x = 10;
  var y = 40;
  var body = [];
    //Cabeceras de la tabla
    const headers = [
      "Proceso",
      "Código",
      "Nombre del documento",
      "Versión",
      "Fecha de emisión",
      "Cambios",
      "Ubicación",
    ];
      //Llenado de datos de los cambios
      datosFiltrados?.forEach((e) => {
        const cambio = [
          e.process,
          e.code,
          e.name,
          e.version,
          e.date,
          e.change,
          e.location,
        ];
        body.push(cambio);
      });
      doc.setFontSize(10);
      // Imprimir info del equipo
      doc.addImage(logo, "PNG", 10, 1, 75, 27);

      doc.addImage(logoIcontent, "PNG", 260, 5, 30, 25);

   
      
      doc.autoTable({
        body: body,
        startY: y ,
        head: [headers],
        theme: "striped",
        styles: {fonSize:8},
        headStyles: {
          fillColor: [240, 248, 255],
          textColor: [0, 0, 0],
          fonSize:9
        },
        columnStyles: {
          6: { cellWidth: 90 }, 
        },
      });
      //Guardar documento
      doc.save(`Filtro de cambios.pdf`);
} catch (error) {
  swal.fire(
    "Tuvimos un error",
    "Por favor intenta mas tarde",
    "error"
  );
}
}
export const downloadDocs = (data) => {
  Swal.fire({
    title: "Estas seguro?",
    text: "Asegurate de haber filtrado los datos, de lo contrario se descargarán todos!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, listo!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      document.querySelector("#btnDownloadPDF").innerHTML = "CARGANDO...";
      const mo = data.map(async (e) => {
        const change = await lastChanges(e.code);
        const dato = {
          code: e.code,
          name: e.name,
          process: e.process_name,
          change: change.data.reason ? change.data.reason : "",
          date: e.last_revision,
          location: e.link ? e.link : "",
          version: e.version,
        };
        return dato;
      });
      Promise.all(mo)
        .then((resultArray) => {
          descargarPDF(resultArray);
          document.querySelector("#btnDownloadPDF").innerHTML = "DESCARGAR PDF";
        })
        .catch((error) => {
          console.error("Ocurrió un error al resolver las promesas:", error);
        });
    }
  });
};

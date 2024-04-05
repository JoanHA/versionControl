import React from "react";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import logo from "../../assets/IMG/LogoBioartPDF.png";
import logoIcontent from "../../assets/IMG/logoIcontec.png";

function DownloadCheckListButton({ data }) {
  const handlePDF = () => {
    Swal.fire({
      title: "Espera!",
      text: "Seguro que quieres descargar en PDF estos datos?",
      icon: "question",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const datosFiltrados = data;
          const info = datosFiltrados.data;
          const doc = new jsPDF("l");
          var x = 10;
          var y = 90;
          
          //Headers
          var body = [
            [
              "Pregunta",
              "ISO 9001",
              "ISO 45001",
              "Decreto 1075" ,
              "Cumple",
              "No cumple",
              "O. Mejora",
              "Observaciones",
            ],
          ];
          //Llenado de datos de la lista
          datosFiltrados.reqs?.forEach((e) => {
            const fields = [
              e.question,
              e.iso9001_article ? e.iso9001_article : "",
              e.iso45001_article ? e.iso45001_article : "",
              e.decreto_article ? e.decreto_article : "",
              e.filled === 1 ? "X" : "",
              e.not_filled === 1 ? "X" : "",
              e.get_better === 1 ? "X" : "",
              e.observations,
            ];
            body.push(fields);
          });

          doc.setFontSize(10);
          // Imprimir info del equipo
          doc.addImage(logo, "PNG", 10, 1, 75, 27);

          doc.addImage(logoIcontent, "PNG", 170, 5, 30, 25);

          doc.text("LISTA DE CHEQUEO AUDITORIAS INTERNAS", 120, x + 30);

          doc.text(`FECHA:  ${info?.date}`, 10, x + 40);
          doc.text(`AUDITOR: ${info?.leader}`, 10, x + 50);
          doc.text(`PROCESO: ${info?.process_name}`, 10, x + 60);
          doc.text(`ESTADO: ${info?.status_name}`, 10, x + 70);

          //Imprimir tabla de eventos

          doc.autoTable({
            body: body,
            startY: y,
            theme: "striped",
            styles: { fonSize: 8 },
            headStyles: {
              fillColor: [240, 248, 255],
              textColor: [0, 0, 0],
              fonSize: 10,
            },
          });
          //Guardar documento
          doc.save(`Lista de chequeo del proceso ${info?.process_name}.pdf`);
        } catch (error) {
          swal.fire(
            "No tenemos datos para descargar",
            "Por favor intenta mas tarde",
            "info"
          );
          console.log(error);
        }
      }
    });
  };
  return (
    <div className="my-1">
      <button className="btn btn-secondary" onClick={handlePDF}>
        Descargar PDF
      </button>
    </div>
  );
}

export default DownloadCheckListButton;

import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx/xlsx.mjs";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import logo from "../assets/IMG/LogoBioartPDF.png";
import logoIcontent from "../assets/IMG/logoIcontec.png";

function DownloadButton({ data = [], filter, info }) {
  const handlePDF = () => {
    Swal.fire({
      title: "Espera!",
      text: "Seguro que quieres descargar en PDF estos datos?",
      icon: "question",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const datosFiltrados = getData();
          const doc = new jsPDF();
          var x = 10;
          var y = 130;
          var body = [];

          //Cabeceras de la tabla
          const headers = [
            "Codigo",
            "Solicitante",
            "Aprobado por",
            "Versión",
            "detalles",
          ];

          //Llenado de datos de los cambios
          datosFiltrados?.forEach((e) => {
            const cambio = [
              e.code,
              e.claimant,
              e.aproved_by,
              e.new_version,
              e.details,
            ];
            body.push(cambio);
          });

          doc.setFontSize(10);
          // Imprimir info del equipo
          doc.addImage(logo, "PNG", 10, 1, 75, 27);

          doc.addImage(logoIcontent, "PNG", 170, 5, 30, 25);

          doc.text(
            `NOMBRE DEL DOCUMENTO:  ${info?.code} ${info?.name}`,
            10,
            x + 30
          );
          doc.text(`TIPOLOGÍA: ${info?.typology_name}`, 10, x + 40);
          doc.text(`PROCESO: ${info?.process_name}`, 10, x + 50);
          doc.text(
            `VERSION: ${
              info?.version < 10 ? `0${info.version}` : info.version
            }`,
            120,
            x + 40
          );
          doc.text(
            `FECHA DE EMISIÓN / ULTIMA REVISIÓN: ${info?.last_revision}`,
            10,
            x + 60
          );
          const Options = { maxWidth: 180 };
          const observacionHeight = doc.getTextDimensions(
            info?.comments,
            Options
          ).h;
          doc.text(`OBSERVACIÓN: ${info?.comments}`, 10, x + 70, Options);

          // Ajustar posición del siguiente bloque de texto
          const nextTextY = x + 80 + observacionHeight + 5;

          doc.text(
            `LINK INTRANET: ${info?.link ? info?.link : ""}`,
            10,
            nextTextY + 1,
            { maxWidth: 180 }
          );

          doc.text("CAMBIOS REALIZADOS A ESTE DOCUMENTO", 70, 120);

          //Imprimir tabla de eventos

          doc.autoTable({
            body: body,
            startY: y ,
            head: [headers],
            theme: "striped",
            styles: {fonSize:8},
            headStyles: {
              fillColor: [240, 248, 255],
              textColor: [0, 0, 0],
              fonSize:10
            },
          });
          //Guardar documento
          doc.save(`Cambios del documento ${info?.code}.pdf`);
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

  // Funcion para filtrar los datos
  const mapear = (map) => {
    var retorno = false;

    map.map((element) => {
      const datas = element.toString().toLowerCase();
      if (datas.match(filter.toLowerCase())) {
        retorno = true;
      }
    });
    return retorno;
  };
  // //obtener los datos Filtrados
  const getData = () => {
    if (filter) {
      if (data != null) {
        //esta funcion toma todos los datos del objeto y los convierte en un string en un array
        //ejemplo {name:"jhon", lastName: "done"} lo convierte en ["jhon","done"]
        //despues de desestructurarlos se compara si algun valor de ese array coincide con el filtro
        const FilteredData = data.filter((equip) => {
          const map = Object.values(equip).filter(Boolean);
          if (mapear(map)) {
            return true;
          }
        });
        if (FilteredData.length === 0) {
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
    <div>
      <div className="btn-group" role="group" aria-label="Basic  example">
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

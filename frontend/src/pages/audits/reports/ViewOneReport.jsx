import React, { useEffect, useState } from "react";
import { getOneReport } from "../../../api/AuditAPI/reportsAPI";
import { Link, useParams } from "react-router-dom";
import { FILES_URL } from "../../../config";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import jsPDF from "jspdf";

function ViewOneReport() {
  const [finding, setFinding] = useState({});
  const [fields, setFields] = useState([]);
  const params = useParams();
  const bringData = async () => {
    try {
      const res = await getOneReport(params.id);
      console.log(res.data)
      setFinding(res.data.findings[0]);
      setFields(res.data.fields);
    } catch (error) {
      swal.fire(error.response.data, "", "error");
    }
  };
  useEffect(() => {
    bringData();
  }, []);
  const handlePdf = async () => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(10)
      var x = 10;
      var y = 80;
      var body = [];

      //Cabeceras de la tabla
      const headers = ["Criterio o procedimiento Verificados", "Hallazgos"];

      //Llenado de datos de los eventos
      fields.forEach((e) => {
        const field = [`${e.article} ${e.type_name} - ${e.name}`, e.details];
        body.push(field);
      });

      // Imprimir info del equipo

      doc.text(`Reporte de hallazgos de auditoria`, 65, 10);
      doc.text(`Fecha: ${finding.date}`, 10, x + 20);
      doc.text(`Proceso: ${finding.name}`, 120, x + 20);

      const VALOROBJEC =`Objetivo: ${finding.objective}`;
      const Options = { maxWidth: 180 };
      doc.text(`Objetivo: ${finding.objective}`, 10, x + 30, { maxWidth: 180 });
      const observacionHeight = doc.getTextDimensions(
        VALOROBJEC,
        Options
      ).h;
      const nextTextY = x + 30 + observacionHeight +5;
      doc.text(`Fortaleza: ${finding.strength}`, 10,nextTextY );
      doc.text(`Debilidades: ${finding.weakness}`, 10, nextTextY +10);
      doc.text(`Nombre auditor: ${finding.leader}`, 10, nextTextY+20);

      doc.text(`Observaciones Generales: ${finding.get_better}`, 10,nextTextY+30, { maxWidth: 180 });
      const heightObser = doc.getTextDimensions(
        `Observaciones Generales: ${finding.get_better}`,
        Options
      ).h;
      const nextY = nextTextY+30 + heightObser;
      doc.text(`Firma del auditor:`, 10,nextY+5);
      doc.addImage(`${FILES_URL}signs/${finding.sign_url}`, "PNG",40, nextY+5, 30,10);
   
      doc.text("Tabla de hallazgos", 70, nextY+20);
      //Imprimir tabla de eventos

      doc.autoTable({
        body: body,
        startY: nextTextY+60,
        head: [headers],
        theme: "striped",
        styles: { fontSize: 8, },
        headStyles: {
          fonSize: 10,
          fillColor: [240, 248, 255],
          textColor: [0, 0, 0],
        },
      });

      //Guardar documento
      doc.save(`Reporte de hallazgos del proceso ${finding.name}.pdf`);
    } catch (error) {
      swal.fire(
        "No hemos podido realizar esa acción",
        "Intenta mas tarde",
        "error"
      );
      console.log(error);
    }
  };
  return (
    <div>
      <div className="titleHeader">Reporte de hallazgos de auditoria</div>

      <div className="px-3">
        {/* Informacion principal */}
        <div className="row  ">
          <div className="col-12">
            <Link
              onClick={() => {
                history.back();
              }}
            >
              <FaArrowCircleLeft size={20} />
            </Link>
          </div>

          <div className="col-10 col-md-3 gap-2 d-flex align-items-center border-top ">
            <div className="">
              <strong>
                <label htmlFor="date">Fecha:</label>
              </strong>
            </div>
            <div className="col-8">
              <input
                type="text"
                id="date"
                defaultValue={finding?.date}
                readOnly
                className="form-control border-0"
              />
            </div>
          </div>
          <div className="col-12 col-md-9 d-flex  align-items-center border-top ">
            <div className="">
              <strong>
                <label htmlFor="process">Proceso:</label>
              </strong>
            </div>
            <div className="col-8">
              <input
                type="text"
                readOnly
                id="process"
                defaultValue={finding?.name}
                className="form-control border-0"
              />
            </div>
          </div>
          <div className="col-12 row border-top ">
            <div className="col-2">
              <strong>
                <label htmlFor="objective">Objetivo de la auditoria:</label>
              </strong>
            </div>
            <div className="col-9">
              <textarea
                id="objective"
                readOnly
                defaultValue={finding?.objective}
                className="form-control border-0"
                style={{ resize: "none" }}
              ></textarea>
            </div>
          </div>

          <div className="col-12  border-top row align-items-center ">
            <div className="col-1">
              <strong>
                <label htmlFor="strength">Fortaleza</label>
              </strong>
            </div>
            <div className="col-11">
              <input
                type="text"
                id="strength"
                defaultValue={finding?.strength}
                readOnly
                className="form-control border-0"
              />
            </div>
          </div>
          <div className="col-12 border-top row align-items-center">
            <div className="col-1">
              <strong>
                <label htmlFor="weakness">Debilidades</label>
              </strong>
            </div>
            <div className="col-11">
              <input
                type="text"
                id="weakness"
                defaultValue={finding?.weakness}
                readOnly
                className="form-control border-0"
              />
            </div>
          </div>
          <div className="col-12 d-flex border-top  align-items-center gap-1">
            <div className="">
              <strong>
                <label htmlFor="leader">Nombre auditor:</label>
              </strong>
            </div>
            <div className="col-7">
              <input
                type="text"
                id="leader"
                readOnly
                defaultValue={finding?.leader}
                className="form-control border-0"
              />
            </div>
          </div>
        </div>
        <hr />
        {/* Tabla de hallazgos  */}
        <div>
          <div>
            <h4>Tabla de hallazgos</h4>
          </div>
          <div className="table-responsive">
            <table className="table table-secondary table-hover table-striped">
              <thead>
                <tr>
                  <th style={{ maxWidth: "400px" }} className="text-center">
                    Criterio o procedimiento Verificados
                  </th>
                  <th className="text-center">Hallazgos</th>
                </tr>
              </thead>
              <tbody>
                {fields.length > 0 ? (
                  fields.map((f, i) => (
                    <tr key={i}>
                      <td>{` ${f.article} ${f.type_name}- ${f.name}`}</td>
                      <td>{f.details}</td>
                    </tr>
                  ))
                ) : (
                  <td></td>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        {/* Informacion final */}
        <div>
          <div className="my-1">
            <div>
              <strong>
                <label htmlFor="observations">Observaciones Generales:</label>
              </strong>
            </div>
            <div>
              <textarea
                id="observations"
                readOnly
                defaultValue={finding?.get_better}
                className="form-control border-0 "
                style={{ resize: "none", height: "100px", maxHeight: "400px" }}
              ></textarea>
            </div>
          </div>
          <div className="d-flex my-2 gap-1 align-items-end ">
            <strong>
              <label htmlFor="">Firma Auditor: </label>
            </strong>
            <div>
              {finding?.sign_url ? (
                <div id="sign-box">
                  <img
                    width={200}
                    alt="Imagen de la firma del auditor"
                    src={`${FILES_URL}signs/${finding.sign_url}`}
                  />
                </div>
              ) : (
                <div>Este reporte no tiene firma</div>
              )}
            </div>
          </div>
          <div className="my-2">
            <button
              className="btn btn-dark col-12 text-uppercase d-flex align-items-center gap-1 justify-content-center"
              onClick={handlePdf}
            >
              Descargar como PDF
              <FaFileDownload size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOneReport;

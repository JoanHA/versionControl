const db = require("../../dbControl");
const express = require("express");
const router = express.Router();
const helper = require("../../lib/helpers");
const fs = require("fs");
const path = require("path");
const getDocuments = async (req, res) => {
  try {
    const response = await db.query(`SELECT  *,
     (SELECT name FROM params WHERE params.id = documents.typology) AS typology_name,
     (SELECT name FROM params WHERE params.id = documents.process) AS process_name,
     (SELECT name FROM params WHERE params.id = documents.status) AS status_name
      FROM documents  `);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
};

const getOneDocument = async (req, res) => {
  const { id } = req.params;
  const sql = `SELECT *, 
    (SELECT name FROM params WHERE params.id = documents.typology) AS typology_name,
    (SELECT name FROM params WHERE params.id = documents.process) AS process_name,
    (SELECT name FROM params WHERE params.id = documents.status) AS status_name,
    (SELECT file_name FROM files WHERE files.document = documents.code) AS file_name
    FROM documents WHERE id= ?`;
  try {
    const response = await db.query(sql, [id]);
    // const fechaOriginal = new Date(response[0].last_revision);

    // const dia = String(fechaOriginal.getDate()).padStart(2, "0");
    // const mes = String(fechaOriginal.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript van de 0 a 11
    // const año = fechaOriginal.getFullYear();
    // const horas = String(fechaOriginal.getHours()).padStart(2, "0");
    // const minutos = String(fechaOriginal.getMinutes()).padStart(2, "0");
    // const segundos = String(fechaOriginal.getSeconds()).padStart(2, "0");

    // const fechaFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    // response[0].last_revision = fechaFormateada;
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
const editDocument = async (req, res) => {
  const file = req.file;
  const code = req.body.code;
  const datos = req.body;
  delete datos.code;

  const sql = `UPDATE documents SET ? WHERE code='${code}'`;
  try {
    const result = await db.query(sql, [datos]);

    if (result.affectedRows > 0) {
      if (file) {
        try {
          const rowResult = await db.query(
            `SELECT * FROM  files WHERE document = '${code}'`
          );

          //Si hay archivos para ese codigo eliminarlo de la base de datos y del servidor
          if (rowResult.length > 0) {
            rowResult.forEach(async (doc) => {
              const FileRoute = path.join(
                __dirname +"../../../public/files/"+doc.file_name
              );
              fs.unlinkSync(`${FileRoute}`);
              //eliminar archivo anterior
              await db.query("DELETE FROM files WHERE id =?", [doc.id]);
             //Guardar nuevo archivo
             const rows = await db.query(`INSERT INTO files SET 
             file_name = '${file.filename}',
             file_type = '${file.mimetype}',
             document = '${code}',
             original_name = '${file.originalname}',
             status = 1
             `);
            });

            //Si no tiene documento previo, guardar el nuevo
          }else{
            const rows = await db.query(`INSERT INTO files SET 
            file_name = '${file.filename}',
            file_type = '${file.mimetype}',
            document = '${code}',
            original_name = '${file.originalname}',
            status = 1
            `);
          }
        } catch (error) {
          console.log(error)
          throw new Error(error)
        }
      }
    }

    res.send("Actualizado con exito!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};
const deleteDocument = async (req, res) => {
  const id = req.params.id;
  try {
    const sql = "DELETE FROM documents WHERE id = ?";
    const resp = await db.query(sql, [id]);
    res.send("Documento Eliminado con exito!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Lo sentimos, tuvimos un problema");
  }
};

const makeDocument = async (req, res) => {
  const data = req.body;
  const file = req.file;
  data.version ? data.version : (data.version = 1);
  data.status = 1;

  const sql = `INSERT INTO documents 
  SET 
    code = '${data.code}', 
    comments = '${data.comments}', 
    last_revision ='${data.last_revision}', 
    process = ${data.process}, 
    typology = ${data.typology}, 
    name = '${data.name}', 
    link = '${data.link}' , 
    version = ${data.version}, 
    status = ${data.status}`;
  
  try {
    const response = await db.query(sql);
    if (response.affectedRows > 0) {
      if (file) {
        const rows = await db.query(`INSERT INTO files SET 
        file_name = '${file.filename}',
        file_type = '${file.mimetype}',
        document = '${data.code}',
        original_name = '${file.originalname}',
        status = 1
        `);
      }
    }

    return res.send("Documento creado con exito!");
  } catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).send("El codigo que indicaste ya esta en uso");
    }
    res.status(500).send("No pudimos realizar esa acción intenta mas tarde");
  }
};
//Create control
const createControl = async (req, res) => {
  const data = req.body;
  data.status = 1;
  data.external = 2;

  const sql = `INSERT INTO storages SET ? `;
  try {
    const response = await db.query(sql, [data]);
    res.send("Control guardado exitosamente!");
  } catch (error) {
    console.log(error);
    res.status(400).send("No pudimos realizar esa acción, intenta mas tarde");
  }
};
//Get the last change from the document
const lastChange = async (req, res) => {
  const code = req.params.code;

  const sql = `SELECT *
  FROM changes
  WHERE code =  '${code}'
  AND created_at = (SELECT MAX(created_at) FROM changes WHERE code = '${code}')
  AND new_version = (SELECT MAX(new_version) FROM changes WHERE code =  '${code}')`;

  try {
    const row = await db.query(sql);
    const last = row[row.length - 1];

    res.send(last);
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};
module.exports = {
  getDocuments,
  editDocument,
  deleteDocument,
  getOneDocument,
  createControl,
  makeDocument,
  lastChange,
};

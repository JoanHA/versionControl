const db = require("../../dbControl");
const express = require("express");
const router = express.Router();
const helper = require("../../lib/helpers");

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
    (SELECT name FROM params WHERE params.id = documents.status) AS status_name
    FROM documents WHERE id= ?`;
  try {
    const response = await db.query(sql, [id]);
    response[0].last_revision = helper.convertTime(response[0].last_revision);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
const editDocument = async (req, res) => {
  const code = req.body.code;
  const datos = req.body;
  delete datos.code;
  const sql = `UPDATE documents SET ? WHERE code='${code}'`;
  try {
    const result = await db.query(sql, [datos]);
    res.send("Actualizado con exito!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};
const deleteDocument =async (req, res) => {
  const id = req.params.id;
  try {
    const sql = "DELETE FROM documents WHERE id = ?"
    const resp = await db.query(sql,[id]);
    res.send("Documento Eliminado con exito!");
  } catch (error) {
    console.log(error)
    res.status(500).send("Lo sentimos, tuvimos un problema");
  }

};

const makeDocument = async (req, res) => {
  const data = req.body;
  data.version ? data.version: data.version = 1;
  data.last_revision = new Date(data.last_revision).toISOString();
  data.status = 1;

  const sql = `INSERT INTO documents 
  SET 
    code = '${data.code}', 
    comments = '${data.comments}', 
    last_revision = STR_TO_DATE('${data.last_revision}', '%Y-%m-%dT%H:%i:%s.%fZ'), 
    process = ${data.process}, 
    typology = ${data.typology}, 
    name = '${data.name}', 
    link = '${data.link}', 
    version = ${data.version}, 
    status = ${data.status}`;
  try {
    const response = await db.query(sql, data);
res.send("Documento creado con exito!")
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
  console.log(data);
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

  const sql = `SELECT details
  FROM changes
  WHERE code = '${code}'
  AND created_at = (SELECT MAX(created_at) FROM changes WHERE code = '${code}')
  AND new_version = (SELECT MAX(new_version) FROM changes WHERE code = '${code}');`;

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

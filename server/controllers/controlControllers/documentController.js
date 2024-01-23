const db = require("../../dbControl");
const express = require("express");
const router = express.Router();
const helper = require("../../lib/helpers");
const { resolveContent } = require("nodemailer/lib/shared");
const getDocuments = async (req, res) => {
  try {
    const response = await db.query(`SELECT  *,
     (SELECT name FROM params WHERE params.id = documents.typology) AS typology_name,
     (SELECT name FROM params WHERE params.id = documents.process) AS process_name
      FROM documents `);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
};
const createDocument = async (req, res) => {
  const data = ({
    typology,
    process,
    name,
    code,
    version,
    last_revision,
    comments,
  } = req.body);

  data.status = 1;
  console.log(data);
  try {
    const response = await db.query("INSERT INTO documents SET  ? ", [data]);
    console.log("respuesta", response);
    res.send("Registro añadido correctamente!");
  } catch (error) {
    console.log(error.code);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).send("El codigo del archivo ya esta en uso");
    }
    res
      .status(500)
      .send("Lo sentimos... no pudimos realizar esa acción intenta mas tarde.");
  }
};
const createDocuments2 = (req, res) => {
  const data = ({
    typology,
    process,
    name,
    code,
    version,
    last_revision,
    comments,
  } = req.body);
  data.status = 1;

  const create = async () => {
    try {
      const response = await db.query("INSERT INTO documents SET  ? ", [data]);
      console.log(response);
      res.json({ status: 200, data: "Respuesta correcta" });
    } catch (error) {
      console.log(error.code);
      console.log(error);
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).send("El codigo del archivo ya esta en uso");
      }
      res
        .status(500)
        .send(
          "Lo sentimos... no pudimos realizar esa acción intenta mas tarde."
        );
    }
  };
  create();
};

const getOneDocument = async (req, res) => {
  const { id } = req.params;
  const sql = `SELECT *, 
    (SELECT name FROM params WHERE params.id = documents.typology) AS typology_name,
    (SELECT name FROM params WHERE params.id = documents.process) AS process_name FROM documents WHERE id= ?`;
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
    const result = await db.query(sql,[datos]);
    console.log(result)
    res.send("Actualizado con exito!")
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde")
  }
};
const deleteDocument = (req, res) => {};

const makeDocument = async (req, res) => {
  const data = req.body;
  data.version = 1;
  data.last_revision = new Date().toISOString();
  data.status = 1;
  console.log(data);
  const sql = `INSERT INTO documents SET ?`;
  try {
    const response = await db.query(sql, data);
    res.send("Documento registrado correctamente!");
    console.log(response);
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
  const sql = `INSERT INTO storages SET ? `;
  try {
    const response = await db.query(sql, [data]);
    res.send("Control guardado exitosamente!");
  } catch (error) {
    console.log(error);
    res.status(400).send("No pudimos realizar esa acción, intenta mas tarde");
  }
};
module.exports = {
  getDocuments,
  createDocument,
  editDocument,
  deleteDocument,
  getOneDocument,
  createDocuments2,
  createControl,
  makeDocument,
};

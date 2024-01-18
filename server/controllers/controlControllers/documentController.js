const db = require("../../dbControl");
const express = require("express");
const router = express.Router()
const helper = require("../../lib/helpers")
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

  // data.last_revision = new Date()
  data.status = 1
  console.log(data)
  try {
     const response = await db.query("INSERT INTO documents SET  ? ", [data]);
     console.log("respuesta",response)
    res.send("Registro añadido correctamente!");
  } catch (error) {
    console.log(error.code);
    if (error.code ==="ER_DUP_ENTRY") {
     return res.status(400).send("El codigo del archivo ya esta en uso");
    }
    res.status(500).send("Lo sentimos... no pudimos realizar esa acción intenta mas tarde.")
  }
};

const getOneDocument = async(req,res)=>{
    const {id} =  req.params
    const sql = `SELECT *, 
    (SELECT name FROM params WHERE params.id = documents.typology) AS typology_name,
    (SELECT name FROM params WHERE params.id = documents.process) AS process_name FROM documents WHERE id= ?`
    try {
      const response = await db.query(sql,[id])
      response[0].last_revision = helper.convertTime(response[0].last_revision )
      res.send(response)
    } catch (error) {
      console.log(error)
    }
}
const editDocument = (req, res) => {};
const deleteDocument = (req, res) => {};

module.exports = {
  getDocuments,
  createDocument,
  editDocument,
  deleteDocument,
  getOneDocument,
};
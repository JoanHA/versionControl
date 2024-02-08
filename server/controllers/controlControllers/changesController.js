const db = require("../../dbControl");
const helper = require("../../lib/helpers");

const createChange = async (req, res) => {
  const data = ({
    aproved_by,
    claimant,
    code,
    reason,
    new_version,
    details,
  } = req.body);
  const last_revision = new Date().toISOString();

  try {


    //Save change
    const response = await db.query("INSERT INTO changes SET ?", [data]);

    //Update the last version of the doc
      const respuesta = await db.query(
        `UPDATE documents SET version =${data.new_version},last_revision='${last_revision}', status=${req.body.status} WHERE code = '${data.code}' `
      );
    
  
    res.send("Datos Ingresados correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).send("No podemos");
  }
};
const getChangesFromOne = async (req, res) => {
  const code = req.params.code;
  try {
    const sql = `SELECT * FROM changes WHERE code='${code}'`;
    const response = await db.query(sql);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send("NO PUDIMOS REALIZAR ESA ACCION");
  }
};
const getArchivedInfo = async (req, res) => {
  const code = req.params.code;
  const sql = `SELECT storages.*,
  (SELECT name FROM params WHERE params.id = storages.last_move) AS last_move_name
  FROM storages
  WHERE code ='${code}'`;

  try {
    const response = await db.query(sql);
    if (response.length <= 0) {
      res.send({ status: 404, data: "Este documento no tiene datos" });
      return;
    }
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
const getChanges = async (req, res) => {
  const sql =
    "SELECT * FROM changes";
  try {
    const response = await db.query(sql);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
const getArchived = async (req, res) => {
  const sql =
    "SELECT storages.*, (SELECT name FROM documents WHERE documents.code = storages.code) AS name, (SELECT name from params WHERE params.id = storages.last_move) AS last_move_name FROM storages WHERE external = 2";
  try {
    const response = await db.query(sql);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
const getExternals = async (req,res)=>{
  const sql =
  "SELECT storages.*, (SELECT name FROM documents WHERE documents.code = storages.code) AS name, (SELECT name from params WHERE params.id = storages.last_move) AS last_move_name FROM storages WHERE storages.external = 1";
try {
  const response = await db.query(sql);
  res.json(response);
} catch (error) {
  console.log(error);
}
}
const createExternal = async(req,res)=>{
  const data = req.body;

  const sql = `INSERT INTO storages SET ? `;
  try {
    const response = await db.query(sql, [data]);
    res.send("Documento externo guardado exitosamente!");
  } catch (error) {
    console.log(error);
    res.status(400).send("No pudimos realizar esa acción, intenta mas tarde");
  }
}
module.exports = {
  createChange,
  getChangesFromOne,
  getArchivedInfo,
  getChanges,
  getArchived,
  createExternal,
  getExternals,
};

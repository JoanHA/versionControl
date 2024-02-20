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
    name,
  } = req.body);
  const isChanging = req.body.change;
  delete data.change;

  const last_revision = new Date().toISOString();
  const dateString = last_revision;
  const dateWithoutMilliseconds = dateString.replace(/\.\d+Z$/, "Z");
  const date = new Date(dateWithoutMilliseconds);
  const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
  //sql para actualizar
  const sql = `UPDATE documents SET
  version =${data.new_version},
  last_revision='${formattedDate}',
  status=${req.body.status} WHERE code = '${data.code}' `;
  const sql2 = `UPDATE documents SET
  last_revision='${formattedDate}',
  status=${req.body.status} WHERE code = '${data.code}' `;
  try {
    //Save change
    const response = await db.query("INSERT INTO changes SET ?", [data]);

    if (!isChanging) {
      //Update the last version of the doc
      const respuesta = await db.query(sql);
    } else {
      //update without the version
      const respuesta = await db.query(sql2);
    }

    res.send("Datos Ingresados correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).send("No podemos realizar esa acción");
  }
};
const deleteChange = async (req, res) => {
  const id = req.params.id;
  try {
    const sql = "DELETE FROM changes WHERE id = ?";
    const response = await db.query(sql, [id]);
    res.send("Cambio eliminado con exito!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Lo sentimos, intenta mas tarde");
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
  const sql = "SELECT * FROM changes";
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
const getExternals = async (req, res) => {
  const sql =
    "SELECT storages.*, (SELECT name FROM documents WHERE documents.code = storages.code) AS name, (SELECT name from params WHERE params.id = storages.last_move) AS last_move_name FROM storages WHERE storages.external = 1";
  try {
    const response = await db.query(sql);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
const createExternal = async (req, res) => {
  const data = req.body;

  const sql = `INSERT INTO storages SET ? `;
  try {
    const response = await db.query(sql, [data]);
    res.send("Documento externo guardado exitosamente!");
  } catch (error) {
    console.log(error);
    res.status(400).send("No pudimos realizar esa acción, intenta mas tarde");
  }
};
const deleteControl = async (req, res) => {
  const id = req.params.id;
  try {
    const sql = "DELETE FROM storages WHERE id = ?";
    const response = await db.query(sql, [id]);
    res.send("Eliminado con exito!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Lo sentimos, intenta mas tarde");
  }
};

const getOneChange = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM changes WHERE id =?`;
  try {
    const result = await db.query(sql, [id]);
    if (result.length <= 0)
      res.status(404).send("Ningún cambio fue encontrado");
    res.send(result[0]);
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.log(error);
  }
};
const editChange = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const sql = `UPDATE changes SET ? WHERE id = ${id}`;

    const result = await db.query(sql, [data]);
    console.log(result);
    if (result.affectedRows < 1)
      return res.status(300).send("No se pudo editar,intenta mas tarde");

    res.send("Cambio editado con exito");
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.log(error);
  }
};
module.exports = {
  createChange,
  getChangesFromOne,
  getArchivedInfo,
  getChanges,
  getArchived,
  createExternal,
  getExternals,
  deleteChange,
  deleteControl,
  getOneChange,
  editChange,
};

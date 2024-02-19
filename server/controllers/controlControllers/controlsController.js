const db = require("../../dbControl");
const helper = require("../../lib/helpers");

const getOneControl = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT *, (SELECT name from documents where documents.code = storages.code) AS name FROM storages WHERE id = ${id}`;
  const result = await db.query(sql);
  if (result.length <= 0) res.status(404).send("Ningún dato fue encontrado");
  res.send(result[0]);
  try {
  } catch (error) {
    req.status.send("Tuvimos un error, intenta mas tarde.");
    console.log(error);
  }
};
const editControl = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const sql = `UPDATE storages SET ? WHERE id=${id} `;
  try {
    const result = await db.query(sql,[data]);
    if (result.affectedRows < 1)
    return res.status(300).send("No se pudo editar,intenta mas tarde");
    res.send("Control editado con exito!")
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.log(error);
  }
};
const editExternal = async (req,res)=>{
  const id = req.params.id;
  const data = req.body;
  const sql = `UPDATE storages SET ? WHERE id=${id} `;
  try {
    const result = await db.query(sql,[data]);
    if (result.affectedRows < 1)
    return res.status(300).send("No se pudo editar,intenta mas tarde");
    res.send("Control editado con exito!")
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.log(error);
  }
}
module.exports = {
  getOneControl,
  editControl,
  editExternal
};

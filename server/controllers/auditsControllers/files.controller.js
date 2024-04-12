const db = require("../../dbControl.js");

const createFiles = async (req, res) => {
  try {
    const file = req.files[0];
    const data = req.body;
    data.file_name = file.filename;
    data.status = 6;
    const response = await db.query("INSERT INTO files SET ?", [data]);
    res.send("Documento guardado con exito!");
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.error(error);
  }
};
const getFiles = async (req, res) => {
  try {
    const sql = "SELECT * FROM files WHERE status = 6";
    const response = await db.query(sql);
    res.send(response);
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.error(error);
  }
};
const deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await db.query("DELETE FROM files WHERE id=?", [id]);
    res.send("Documento eliminado con exito!");
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.error(error);
  }
};
module.exports = {
  createFiles,
  getFiles,
  deleteFile
};

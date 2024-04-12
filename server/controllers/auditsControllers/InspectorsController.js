const db = require("../../dbControl.js");

const getInspectors = async (req, res) => {
  const inspectors = await db.query(
    "SELECT * FROM inspectors WHERE status = 1"
  );
  res.send(inspectors);
};
const createInspectors = async (req, res) => {
  const datos = req.body;
  datos.status = 1;
  const files = req.files;
  try {
    const result = await db.query("INSERT INTO inspectors SET ? ", [datos]);
    const insertedId = result.insertId;
    var filesInserted = true;
    if (files.length > 0) {
      files.forEach(async (element) => {
        const save = {
          file_name: element.filename,
          file_type: element.mimetype,
          original_name: element.originalname,
          status: 1,
          inspectors_id: insertedId,
        };
        try {
          await db.query("INSERT INTO files SET ?", [save]);
        } catch (error) {
          console.error(error);
          filesInserted = false;
        }
      });
    }
    if (filesInserted) {
      res.send("Auditor creado con exito");
    } else {
      res.send(
        "Auditor creado con exito, pero no pudimos agregar los archivos"
      );
    }
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};
const editInspectors = async (req, res) => {
  const datos = req.body;
  datos.status = 1;
  const id = req.params.id;
  const files = req.files;
  try {
    const result = await db.query("UPDATE inspectors SET ? WHERE id= ? ", [
      datos,
      id,
    ]);
    var filesInserted = true;
    if (files.length > 0) {
      files.forEach(async (element) => {
        const save = {
          file_name: element.filename,
          file_type: element.mimetype,
          original_name: element.originalname,
          status: 1,
          inspectors_id: id,
        };
        try {
          await db.query("INSERT INTO files SET ?", [save]);
        } catch (error) {
          console.error(error);
          filesInserted = false;
        }
      });
    }
    if (filesInserted) {
      res.send("Auditor Editado con exito");
    } else {
      res.send(
        "Auditor editado con exito, pero no pudimos agregar los archivos"
      );
    }
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};
const deleteInspectors = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await db.query(
      "UPDATE inspectors SET status = 2 WHERE id = ?",
      [id]
    );
    res.send("Auditor eliminado con exito!")
  } catch (error) {
    res.status(403).send("Tuvimos un error intenta mas tarde");
    console.error(error);
  }
};
const getOneInspector = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await db.query(
      "SELECT inspectors.*  FROM inspectors WHERE inspectors.id= ?",
      [id]
    );
    const files = await db.query("SELECT * FROM files WHERE inspectors_id =?", [
      id,
    ]);
    const datos = {
      user: response[0],
      files: files,
    };
    res.send(datos);
  } catch (error) {
    res.status(403).send("Tuvimos un error intenta mas tarde");
    console.error(error);
  }
};
const getRoles = async (req,res)=>{
  try {
    const roles = await db.query("SELECT * FROM inspectors_rols WHERE status= 1")
    res.send(roles)
  } catch (error) {
    res.status(403).send("Tuvimos un error intenta mas tarde");
    console.error(error);
  }
}
module.exports = {
  getInspectors,
  editInspectors,
  deleteInspectors,
  getOneInspector,
  createInspectors,
  getRoles
};

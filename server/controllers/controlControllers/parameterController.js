const db = require("../../dbControl");
const helper = require("../../lib/helpers");

const createParam = async (req, res) => {
  const { paramtype_id, value } = req.body;
  var lastId = 1000;
  try {
    const result = await db.query(
      "SELECT name,id FROM params WHERE paramtype_id = ?",
      [paramtype_id]
    );
    for (let i = 0; i < result.length; i++) {
      const id = result[i].id;
      lastId = id;
    }
    const response = await db.query(
      "INSERT INTO params (id,name,status,paramtype_id) VALUES (?,?,1,?)",
      [lastId + 9000, value, paramtype_id]
    );

    res.send("Parametro creado con exito!");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Lo sentimos, no pudimos realizar esa acción. Intenta mas tarde");
  }
};

//Ultimos datos modificado para el welcome de admin
const lastModified = async (req, res) => {
  const sql =
    "SELECT code, updated_at FROM documents WHERE updated_at > CURRENT_TIMESTAMP - INTERVAL 5 DAY ORDER BY updated_at DESC LIMIT 5;";
  try {
    const response = await db.query(sql);

    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//Los documentos con mas modificaciones
const mostModified = async (req, res) => {
  const sql =
    "SELECT COUNT(code) AS count ,code FROM changes GROUP BY code ORDER BY COUNT(code) DESC LIMIT 5";
  try {
    const response = await db.query(sql);

    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error intenta mas tarde");
  }
};

const getParams = async (req, res) => {
  const sql = "SELECT * FROM params WHERE status = 1";
  try {
    const result = await db.query(sql);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("No pudimos realizar esa acción, intenta mas tarde");
  }
};

const editParam = async (req, res) => {
  const { id, value } = req.body;
  const sql = `UPDATE params SET name = '${value}' WHERE id = ${id}`;
  try {
    const result = await db.query(sql);

    res.send("Parametro actualizado exitosamente!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};
const deleteParam = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("UPDATE params SET status=2 WHERE id=?", [id]);
    res.send("Parametro eliminado exitosamente!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};
module.exports = {
  createParam,
  lastModified,
  mostModified,
  getParams,
  editParam,
  deleteParam,
};

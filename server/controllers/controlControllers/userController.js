const db = require("../../dbControl");

const getAllUsers = async (req, res) => {
  try {
    const response = await db.query(
      "SELECT users.*, (SELECT name FROM params WHERE params.id = users.status) AS statusName FROM users"
    );
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error intenta mas tarde");
  }
};

const updateUsers = async (req, res) => {
  const { email, status, username } = req.body;
  const datos = {
    status,
    email,
  };
  try {
    const result = await db.query("UPDATE users SET ? WHERE username=?",[datos,username]);
    console.log(result)
    if (result.affectedRows >0) {
      return res.send("Usuario editado con exito")
    }
    res.status(404).send("El usuario no fue encontrado. No pudimos editar")
  } catch (error) {
    console.log(error)
    res.status(500).send("Tuvimos un error, intenta mas tarde")
  }
};
module.exports = {
  getAllUsers,
  updateUsers,
};

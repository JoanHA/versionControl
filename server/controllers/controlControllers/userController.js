const db = require("../../dbControl");
const helper = require("../../lib/helpers");
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
    const result = await db.query("UPDATE users SET ? WHERE username=?", [
      datos,
      username,
    ]);
    console.log(result);
    if (result.affectedRows > 0) {
      return res.send("Usuario editado con exito");
    }
    res.status(404).send("El usuario no fue encontrado. No pudimos editar");
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT users.username, users.email ,users.status FROM users WHERE users.id = ?";
  try {
    const result = await db.query(sql, [id]);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(401).send("Tuvimos un error, intenta mas tarde");
  }
};

//cambiar contraseña con email
const changePassword = async (req, res) => {
  const { id, password } = req.body;
  try {
    const hashPassword = await helper.encypt(password); //Si son iguales encriptar la
    const rows = await db.query("UPDATE users SET password = ?  WHERE id= ?", [
      hashPassword,
      id,
    ]);
    if (rows.affectedRows > 0) {
      res.send("Contraseña editada correctamente");
      return
    }

    res.status(300).send("Ese usuario no esta registrado");


    //Actualizar usuario
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error intenta mas tarde");
  }
};

module.exports = {
  getAllUsers,
  updateUsers,
  getOneUser,
  changePassword,
};

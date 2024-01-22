const db = require("../../dbControl.js");
const helper = require("../../lib/helpers.js");

const login = async (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT users.* FROM users WHERE users.email = ?`;
  try {
    const result = await db.query(sql, [email]); //Buscar el usuario
    //Sin no hay usuarios con ese email,devolver error
    if (!result[0]) {
      res.status(403).send(["Crendeciales incorrectas"]);
      return;
    }

    const userFound = result[0]; //usuario encontrado
    const hashPassword = userFound.password; //contraseña cifrada de usuario
    const isMatch = await helper.compare(password, hashPassword); //Si las contraseñas son iguales el usuario puede pasar sino devuelve error

    if (!isMatch) {
      res.status(403).send(["Crendeciales incorrectas"]);
      return;
    }

    //SI el usuario no esta con estadi de 1 quiere decir que el usuario esta bloqueado
    if (userFound.status != 1) {
      res.status(401).send(["Usuario bloqueado"]);
      return;
    }

    const token = await helper.createToken({ id: userFound.id }); //Token
    //Save the token in  a cookie
    res.cookie("token", token);

    //Send to the client
    console.log("Usuario logueado correctamente");
    res.send({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body; //Get the data
    const hashPassword = await helper.encypt(password); //Encrypt the password
    const user = {
      email,
      password: hashPassword,
      username,
      status: 1,
    };
    //Buscar si existe un usuario con ese correo
    const result = await db.query(
      "SELECT * from users where email = ? or username = ?",
      [email, username]
    );
    if (result.length > 0) {
      res.status(401).send(["Ese correo/usuario ya esta registrado"]);
      return;
    } else {
      await db.query("INSERT INTO users SET ?", [user]); //Guardar el usuario
      const rows = await db.query("SELECT users.* WHERE users.email = ?", [
        email,
      ]); //buscar el usuario de nuevo para devolver los datos
      const usersaved = rows[0]; // UserFound
      const token = await helper.createToken({ id: usersaved.id }); //Token
      console.log("usuario encontrado", usersaved);
      //Save the token in  a cookie
      res.cookie("token", token, { httpOnly: true });
      //Send to the client
      res.send({
        id: usersaved.id,
        username: usersaved.username,
        email: usersaved.email,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  register,
};

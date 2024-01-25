const db = require("../../dbControl");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//Obtener las iniciales y los tipos de documento 
const getCodeLetters = async (req, res) => {
  const sql =
    "SELECT paramtype_id,name,id FROM params WHERE paramtype_id = 4 OR paramtype_id=5 AND status =1";
  try {
    const response = await db.query(sql);
    res.send(response);
  } catch (error) {
    console.error(error);
  }
};
//obtener los procesos y tipologias de la base de datos
const getProcessAndTypologies =async(req,res)=>{
  const sql = `
  SELECT paramtype_id,name,id FROM params WHERE paramtype_id = 2 OR paramtype_id=3 AND status =1
  `;
  
  try {
    const response = await db.query(sql);
    res.send(response);
  } catch (error) {
    console.error(error);
  }
}
//Obtener la disposicion final
const getLastMove = async(req,res)=>{
  const sql = `SELECT id, name, paramtype_id FROM params WHERE paramtype_id = 1`;
  try {
    const response = await db.query(sql);
    res.send(response)
  } catch (error) {
    res.status(500).send("No pudimos realizar esa acción intenta mas tarde")
    console.log(error)
  }
}

const verify = async (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_SECRET,async (error, user) => {
    if (error) {
      res.status(500).json({ status: 500, error });
      console.log(error);
    } else {
      try {
        const row = await db.query( `SELECT users.* FROM users WHERE users.id=${user.id}`);
        const usuario = {
          id: row[0].id,
          username: row[0].username,
          email: row[0].email,
          rolName: row[0].name,
          rol: row[0].rol,
        };
        res.send(usuario);
        
      } catch (error) {
        res.status(500).send("Tuvimos un error intenta mas tarde")
        return console.log(error);
      }
    }
  });
}

// //Cambiar contraseña para usuario
// router.post("/changePassword", (req, res) => {
//   const { id } = req.body;
//   //Buscat el usuario que tenga ese id
//   db.query(
//     "SELECT password,rol from users where id = ? ",
//     [id],
//     async (err, rows) => {
//       if (err) throw new Error(err);
//       //Validar que hayan usuarios con ese id
//       if (rows.length > 0) {
//         //Traer el rol y la contraseña del usuario a editar
//         const rol = rows[0].rol;
//         const oldpassword = rows[0].password;

//         //Validar si es usuario es administrar o no
//         if (rol != 271) {
//           //Si NO es administrador  validar que las contraseñas sean iguales
//           const newPassword = req.body.Newpassword;
//           const confirmPassword = req.body.Confirmpassword;

//           if (newPassword === confirmPassword) {
//             const hashPassword = await helper.encypt(newPassword); //Si son iguales encriptar la contraseña nueva
//             //Actualizar usuario
//             db.query(
//               "UPDATE users SET password = ? where id = ?",
//               [hashPassword, id],
//               (error, result) => {
//                 if (error) throw new Error(error);
//                 console.log(result);
//                 res.send("Usuario actualizado Correctamente!"); //Usuario  Actualizado
//               }
//             );
//             //Si son diferentes Enviar el error
//           } else {
//             res.status(300).send(["Las contraseñas no son iguales..."]);
//           }

//           //SI es usuario es admin
//         } else {
//           //Validar si la contraseña actual es la misma que envió
//           const Password = req.body.Password;

//           const isMatch = await helper.compare(Password, oldpassword);
//           console.log(isMatch);
//           //Si es igual
//           if (isMatch == true) {
//             const newPassword = req.body.Newpassword;
//             const confirmPassword = req.body.Confirmpassword;
//             if (newPassword === confirmPassword) {
//               const hashPassword = await helper.encypt(newPassword); //Si son iguales encriptar la contraseña nueva
//               //Actualizar usuario
//               db.query(
//                 "UPDATE users SET password = ? where id = ?",
//                 [hashPassword, id],
//                 (error, result) => {
//                   if (error) throw new Error(error);
//                   console.log(result);
//                   res.send("Usuario actualizado Correctamente!"); //Usuario  Actualizado
//                 }
//               );
//               //Si son diferentes Enviar el error
//             } else {
//               res.status(300).send(["Las contraseñas no son iguales..."]);
//             }

//             //Si la contraseña actual es erronea
//           } else {
//             res.status(300).send(["La contraseña actual es incorrecta..."]);
//           }
//         }
//       }
//     }
//   );
// });

// //cambiar contraseña con email
// router.put("/changePassword/email", (req, res) => {
//   const { email, password } = req.body;
//   //Buscar el usuario que tenga ese email
//   db.query(
//     "SELECT * from users where email = ? ",
//     [email],
//     async (err, rows) => {
//       if (err) {
//         console.log(err);
//         throw new Error(err);
//       }
//       //Validar que hayan usuarios con ese email
//       if (rows.length > 0) {
//         //Validar si es usuario es administrar o no
//         const hashPassword = await helper.encypt(password); //Si son iguales encriptar la contraseña nueva
//         //Actualizar usuario
//         db.query(
//           "UPDATE users SET password = ? where email = ?",
//           [hashPassword, email],
//           (error, result) => {
//             if (error) throw new Error(error);
//             console.log(result);
//             res.send("Usuario actualizado Correctamente!"); //Usuario  Actualizado
//           }
//         );
//       } else {
//         res.status(300).send(["No hay usuarios con ese email"]);
//       }
//     }
//   );
// });

// //editar de parametros
// router.put("/editParams/:id", (req, res) => {
//   const id = req.params.id;
//   const { name } = req.body;
//   const año = new Date().getFullYear();
//   const dia = new Date().getDay();
//   const mes = new Date().getMonth();

//   db.query(
//     `UPDATE params SET name = ? WHERE id = ? `,
//     [name, id],
//     (error, result) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).send("Tuvimos un error");
//       }
//       res.send("Editado Correctamente");
//     }
//   );
// });

// //eliminar parametro
// router.delete("/deleteParams/:id", (req, res) => {
//   const id = req.params.id;
//   const año = new Date().getFullYear();
//   const dia = new Date().getDay();
//   const mes = new Date().getMonth();
//   db.query(
//     `UPDATE params SET param_state = 3 WHERE id = ? `,
//     [id],
//     (error, result) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).send("Tuvimos un error");
//       }
//       res.send("Eliminado Correctamente");
//     }
//   );
// });
module.exports = {
  getCodeLetters,
  getProcessAndTypologies,
  getLastMove,
  verify,
};

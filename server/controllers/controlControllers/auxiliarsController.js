const db = require("../../dbControl");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Excel = require("exceljs");
const path = require("path");
const helper = require("../../lib/helpers");
require("dotenv").config();
const nodemailer = require("nodemailer");
//Obtener las iniciales y los tipos de documento
const getCodeLetters = async (req, res) => {
  const sql =
    "SELECT paramtype_id,name,id FROM params WHERE status = 1 AND (paramtype_id = 4 OR paramtype_id=5 ); ";
  try {
    const response = await db.query(sql);
    res.send(response);
  } catch (error) {
    console.error(error);
  }
};
//obtener los procesos y tipologias de la base de datos
const getProcessAndTypologies = async (req, res) => {
  const sql = `
  SELECT paramtype_id, name, id
FROM params
WHERE status = 1 AND (paramtype_id = 2 OR paramtype_id = 3);

  `;

  try {
    const response = await db.query(sql);
    res.send(response);
  } catch (error) {
    console.error(error);
  }
};
//Obtener la disposicion final
const getLastMove = async (req, res) => {
  const sql = `SELECT id, name, paramtype_id FROM params WHERE paramtype_id = 1 AND status=1`;
  try {
    const response = await db.query(sql);
    res.send(response);
  } catch (error) {
    res.status(500).send("No pudimos realizar esa acción intenta mas tarde");
    console.log(error);
  }
};

const verify = async (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
    if (error) {
      res.status(500).json({ status: 500, error });
      console.log(error);
    } else {
      try {
        const row = await db.query(
          `SELECT users.* FROM users WHERE users.id=${user.id}`
        );
        const usuario = {
          id: row[0].id,
          username: row[0].username,
          email: row[0].email,
          rolName: row[0].name,
          rol: row[0].rol,
        };
        res.send(usuario);
      } catch (error) {
        res.status(500).send("Tuvimos un error intenta mas tarde");
        return console.log(error);
      }
    }
  });
};

const getId = async (string, type) => {
  try {
    const params = await db.query("SELECT * FROM params WHERE status = 1");

    const result = params.find(
      (e) => e.name.toLowerCase().trim() == string.toLowerCase().trim()
    );

    if (result) {
      return result.id;
    }
    const lastID = params[params.length - 1].id;
    const newParam = {
      id: lastID + 1,
      name: string,
      paramtype_id: type,
      status: 1,
    };
    const newP = await db.query(`INSERT INTO PARAMS SET ? `, [newParam]);
    return lastID + 1;
  } catch (error) {
    console.log(error);
    return 2;
  }
};
const createMasive = async (req, res) => {
  try {
    const file = req.file;
    const workbook = new Excel.Workbook();
    const filePath = path.join(
      __dirname,
      "../../public/uploads/",
      file.filename
    );

    const response = await workbook.xlsx.readFile(filePath);

    const jsonData = {};

    workbook.eachSheet((worksheet, sheetId) => {
      const sheetData = [];

      worksheet.eachRow((row, rowNumber) => {
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          rowData[`column${colNumber}`] = cell.value;
        });
        sheetData.push(rowData);
      });

      jsonData[`Sheet${sheetId}`] = sheetData;
    });
    const MasterList = [];
    const changes = [];
    const retention = [];

    //Guardar listado maestro
    for (let i = 4; i < jsonData.Sheet1.length; i++) {
      const dato = jsonData.Sheet1[i];
      const listData = {
        typology: dato.column1 ? await getId(dato.column1, 2) : null,
        process: dato.column2 ? await getId(dato.column2, 3) : null,
        code: dato.column6.result ? dato.column6.result : null,
        name: dato.column7 ? dato.column7 : null,
        version: dato.column8
          ? isNaN(parseInt(dato.column8))
            ? 0
            : parseInt(dato.column8)
          : 0,
        last_revision: dato.column9 ? dato.column9 : null,
        comments: dato.column10 ? dato.column10 : null,
        status: 1,
      };
      const resList = await db.query("INSERT INTO documents SET ?", listData);
    }
    //Guardar cambios
    for (let i = 4; i < jsonData.Sheet6.length; i++) {
      const dato = jsonData.Sheet6[i];
      const changesData = {
        code: `${dato.column1 ? dato.column1 : null}${
          dato.column2 ? dato.column2 : null
        }${dato.column3 ? dato.column3 : null}`,
        claimant: dato.column5 ? dato.column5 : null,
        reason: dato.column6 ? dato.column6 : null,
        details: dato.column7 ? dato.column7 : null,
        aproved_by: dato.column9 ? dato.column9 : null,
        new_version: dato.column8
          ? isNaN(parseInt(dato.column8))
            ? 0
            : parseInt(dato.column8)
          : 0,
        status: 1,
      };
      const resChange = await db.query("INSERT INTO changes SET ?", [
        changesData,
      ]);
    }

    //guargar control de registros
    for (let i = 4; i < jsonData.Sheet5.length; i++) {
      const dato = jsonData.Sheet5[i];
      const retentiondata = {
        code: dato.column3 ? dato.column3 : null,
        responsible: dato.column4 ? dato.column4 : null,
        saved_in: dato.column5 ? dato.column5 : null,
        saved_format: dato.column6 ? dato.column6 : null,
        actived_saved: dato.column7 ? dato.column7 : null,
        inactived_saved: dato.column8 ? dato.column8 : null,
        last_move: dato.column9 ? await getId(dato.column9, 1) : null,
        status: 1,
      };
      const resControl = await db.query("INSERT INTO storages SET ?", [
        retentiondata,
      ]);
    }

    res.send("Documentos creados correctamente");
  } catch (error) {
    console.error("Error al procesar el archivo Excel:", error);
    res.status(500).send("Error al procesar el archivo Excel.");
  }
};
//Recuperar contraseña

function sendEmail(recipient_email, OTP) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false, // Cambia a 'true' si usas el puerto 465
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "Recuperación de contraseña",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Recuperar contraseña</title>
</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Recuperación de contraseña</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p> Usa el siguiente Código para completar la recuperacion de tu contraseña. El código es valido por  5 minutos</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Bioart</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Bioart SA</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}
const sendEmails = (req, res) => {
  const { OTP, recipient_email } = req.body;
  sendEmail(recipient_email, OTP)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
};

//cambiar contraseña con email
const changePasswordWithEmail = async (req, res) => {
  const { email, password } = req.body;
  //Buscar el usuario que tenga ese email
  try {
    const rows = await db.query("SELECT * from users where email = ? ", [
      email,
    ]);
    console.log(rows);
    if (rows.length > 0) {
      const properEmail = rows[0].email;
      console.log(properEmail);
      const hashPassword = await helper.encypt(password);
      const response = await db.query(
        "UPDATE users SET password = ? where email = ?",
        [hashPassword, email]
      );
      res.send("Usuario actualizado Correctamente!");
    } else {
      res.status(404).send("Ese usuario no existe en la plataforma!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("No pudimos realizar esta acción");
  }
};

module.exports = {
  getCodeLetters,
  getProcessAndTypologies,
  getLastMove,
  verify,
  createMasive,
  sendEmails,
  changePasswordWithEmail,
};

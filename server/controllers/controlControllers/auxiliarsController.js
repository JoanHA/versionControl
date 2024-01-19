const db = require("../../dbControl");
const express = require("express");
const router = express.Router();

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
module.exports = {
  getCodeLetters,
  getProcessAndTypologies,
  getLastMove,
};

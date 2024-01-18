const mysql = require("mysql2")
if (process.env.NODE_ENV !== "production") require('dotenv').config();
const util = require("util")
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.CONTROL_MYSQL_USER,
    password: process.env.CONTROL_MYSQL_PASSWORD,
    database: process.env.CONTROL_MYSQL_DATABASE,  
})
 
db.getConnection((err,connection)=>{
    if(err){
        console.error(err)
        console.log("No nos pudimos conectar a la base de datos")
        return;
    }
    if(connection) connection.release()
    console.log("Connected to controlDB");
})
//Promisify connection

db.query = util.promisify(db.query)

module.exports = db

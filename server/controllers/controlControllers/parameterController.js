const db = require("../../dbControl");
const helper = require("../../lib/helpers");

const createParam = async (req,res)=>{
    const {paramtype_id,value} = req.body
  var lastId = 1000;
    try {
    const result = await db.query("SELECT name,id FROM params WHERE paramtype_id = ?",[paramtype_id]);
    for (let i = 0; i < result.length; i++) {
        const id = result[i].id;
        lastId = id;        
    }
  const response = await db.query("INSERT INTO params (id,name,status,paramtype_id) VALUES (?,?,1,?)",[lastId+1,value,paramtype_id])
  console.log(response)
  res.send("Parametro creado con exito!")

  } catch (error) {
    console.log(error)
    res.status(500).send("Lo sentimos, no pudimos realizar esa acción. Intenta mas tarde")
  }
  
}
module.exports = {
    createParam
};

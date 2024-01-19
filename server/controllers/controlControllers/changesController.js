const db = require("../../dbControl");
const helper = require("../../lib/helpers");

const createChange = async (req, res) => {
  const data = ({
    aproved_by,
    claimant,
    code,
    reason,
    new_version,
    details,
  } = req.body);
  data.status = 1;
  const last_revision = new Date();

  console.log(data)
try {
    const response = await db.query("INSERT INTO changes SET ?",[data])
    console.log(response)
    const respuesta = await db.query(`UPDATE documents SET version =${data.new_version},last_revision='${last_revision}' WHERE code = '${data.code}' `)
    console.log(respuesta)
    res.send("Datos Ingresados correctamente")
} catch (error) {
 console.log(error)
 res.status(500).send("No podemos")   
}
 
};

module.exports = {
  createChange,
};

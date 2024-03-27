const db = require("../../dbControl.js");

const getAuditTypes = async (req, res) => {
  try {
    const parametros = await db.query(
      "SELECT * FROM params WHERE paramtype_id = 7"
    );
    res.send(parametros);
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};
module.exports = {
  getAuditTypes,
};

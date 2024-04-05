const db = require("../../dbControl");
const fs = require("fs");
const getNOAndOMRequisites = async (req, res) => {
  const check_id = req.params.id;
  const sql = `SELECT apf.date,
  clf.iso_9001,
clf.iso_45001,
clf.decreto,
  clf.filled,
  clf.not_filled,
  clf.get_better,
  ap.leader,
  ap.objective,
  apf.processes_id,
  apf.check_list_id ,
  (SELECT name from processes WHERE processes.id = apf.processes_id) AS process_name,
  iso9.name AS iso9_name, 
  iso4.name AS iso4_name, 
  decreto.name AS decreto_name, 
  iso9.article AS iso9_article, 
  iso4.article AS iso4_article, 
  decreto.article AS decreto_article
  FROM check_list_fields clf
  LEFT JOIN requirements iso9 ON clf.iso_9001 = iso9.id
  LEFT JOIN requirements iso4 ON clf.iso_45001 = iso4.id
  LEFT JOIN requirements decreto ON clf.decreto = decreto.id
  LEFT JOIN audit_plan_fields  apf ON apf.check_list_id = ?
  LEFT JOIN audit_plans ap ON ap.id = apf.audit_plan_id
  WHERE clf.check_list_id = ?`;
  try {
    const response = await db.query(sql, [check_id, check_id]);
    //filtro en caso de necesitarlo
    //    const datos =  response.filter((r)=>r.not_filled ===1 || r.get_better ===1)
    //     console.log(datos)
    res.send(response);
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde...");
    console.error(error);
  }
};
const createReports = async (req, res) => {
  const data = req.body;
  const image = data.img;
  try {
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const uniqueFilename = "Sign_" + Date.now() + ".png";

    fs.writeFileSync("./public/signs/" + uniqueFilename, base64Data, "base64");
  } catch (error) {
    return res.status(500).send("Error al guardar la imagen");
  }
};

module.exports = {
  getNOAndOMRequisites,
  createReports,
};

const db = require("../../dbControl");
const fs = require("fs");
const getNOAndOMRequisites = async (req, res) => {
  const check_id = req.params.id;
  const sql = `SELECT apf.date,
  clf.iso_9001,
  clf.iso_45001,
  clf.decreto,
  apf.audit_plan_id,
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
  delete data.img;
  try {
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const uniqueFilename = "Sign_" + Date.now() + ".png";
    fs.writeFileSync("./public/signs/" + uniqueFilename, base64Data, "base64");

    const findingRes = await db.query("INSERT INTO findings SET ? ", [
      {
        strength: data.strength,
        weakness: data.weakness,
        sign_url: uniqueFilename,
        get_better: data.get_better,
        audit_plan: data.audit_plan,
      },
    ]);

    const findings_id = findingRes.insertId;
    const checkList = await db.query(
      `UPDATE check_lists SET finding_id = ${findings_id} WHERE id =${data.check_list_id}`
    );
    data.findings.forEach(async (finding) => {
      try {
        await db.query("INSERT INTO finding_fields SET ? ", [
          {
            requisite: finding.id,
            details: finding.valor,
            findings_id,
          },
        ]);
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    });
    res.send("Reporte creado correctamente!");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};
const viewOneReport = async (req, res) => {
  try {
    const dataToSend = {};
    const { id } = req.params;
    const findings = await db.query(
      `SELECT findings.* ,
    audit_plan_fields.processes_id,
    processes.name ,
    audit_plan_fields.date,
    audit_plans.leader,
    audit_plans.objective
    FROM findings
    LEFT JOIN audit_plan_fields ON audit_plan_fields.id = findings.audit_plan
    LEFT JOIN processes ON processes.id = audit_plan_fields.processes_id
    LEFT JOIN audit_plans ON audit_plans.id = audit_plan_fields.audit_plan_id
    WHERE findings.id = ?
    `,
      [id]
    );
    const fields = await db.query(
      `SELECT f.requisite,
      f.details ,
      f.action_plan_id,
      r.article,
      r.name,
      r.type,
      params.name AS type_name
      FROM finding_fields f
      LEFT JOIN requirements r ON r.id = f.requisite
      LEFT JOIN params ON params.id = r.type
      WHERE f.findings_id = ?`,
      [id]
    );
    dataToSend.findings = findings;
    dataToSend.fields = fields;


    res.send(dataToSend);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};
const getReports = async (req, res) => {
  try {
    const reports = await db.query(`SELECT findings.* ,
    audit_plan_fields.processes_id,
    processes.name ,
    audit_plan_fields.date,
    audit_plans.leader,
    audit_plans.objective
    FROM findings
    LEFT JOIN audit_plan_fields ON audit_plan_fields.id = findings.audit_plan
    LEFT JOIN processes ON processes.id = audit_plan_fields.processes_id
    LEFT JOIN audit_plans ON audit_plans.id = audit_plan_fields.audit_plan_id
    `);
    res.send(reports);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};

//Valida el estado de las listas de chequeo para habilitar el boton de crear informe final
const validateStatus = async(req,res)=>{
  try {
    const {id} = req.params
    const sql = `SELECT cl.status, 
    (SELECT name FROM processes WHERE processes.id = apf.processes_id) AS process_name,
    apf.date,
    apf.init_time,
    apf.id,
    (SELECT count(*) FROM findings WHERE audit_plan = apf.id) AS finding_count,
    apf.end_time
    FROM audit_plans ap 
    LEFT JOIN audit_plan_fields apf ON apf.audit_plan_id = ap.id
    LEFT JOIN check_lists cl ON cl.id = apf.check_list_id
    WHERE ap.id= ?`

    const result = await db.query(sql,[id]);
  
    res.send(result)
  } catch (error) {
    console.log(error);
    return res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
}

module.exports = {
  getNOAndOMRequisites,
  createReports,
  viewOneReport,
  getReports,
  validateStatus,
};

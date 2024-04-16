const db = require("../../dbControl");

const getOneFinal = async (req, res) => {
  const { id } = req.params;
  //Obtener el plan de auditoria
  const sqlPlan = `
        SELECT 
        ap.objective,
        ap.scope,
        ap.criteria,
        ap.leader,
        ap.validity,
        ap.id
        FROM audit_plans ap
        LEFT JOIN audit_plan_has_inspectors aphi ON aphi.audit_plan_id = ap.id
        WHERE ap.id = ?`;

  //obtener los auditores
  const sqlAudit = `
     SELECT i.job,
     i.id,
     i.full_name
     FROM audit_plan_has_inspectors aphi 
     LEFT JOIN inspectors i ON i.id = aphi.inspectors_id
     WHERE aphi.audit_plan_id = ?`;

  //obtenes los procesos no conformes de lo fields
  const sqlProcess = `SELECT processes.id,
  processes.name,
   clf.filled,
   clf.not_filled,
   clf.get_better,
   clf.iso_9001,
   clf.iso_45001,
   clf.decreto,
   riso.name AS iso9001_name,
   riso.article as iso9001_article,
   riso.type AS iso9001_type,
   riso4.name AS iso4001_name,
   riso4.article as iso_4001article,
   riso4.type AS iso4001_type,
   rdecreto.name AS decreto_name,
   rdecreto.article as decreto_article,
   rdecreto.type AS decreto_type
   FROM audit_plan_fields apf
   INNER JOIN check_lists cl ON cl.id = apf.check_list_id 
   INNER JOIN check_list_fields clf ON clf.check_list_id = cl.id
   INNER JOIN processes ON processes.id = apf.processes_id
   LEFT JOIN requirements riso ON riso.id = clf.iso_9001 
   LEFT JOIN requirements riso4 ON riso4.id = clf.iso_45001 
   LEFT JOIN requirements rdecreto ON rdecreto.id = clf.decreto
     WHERE apf.audit_plan_id =?`;

  try {
    const auditPlan = await db.query(sqlPlan, [id]);
    const inspectors = await db.query(sqlAudit, [id]);
    const requisites = await db.query(sqlProcess, [id]);

    const toSend = {
      auditPlan,
      inspectors,
      requisites,
    };

    res.send(toSend);
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};
const createFinal = async (req, res) => {
  const data = req.body;
  const auditLeaderSign = req.files["audit_leader_sign"][0];
  const representSign = req.files["represent_sign"][0];
  const final_report_requisites = JSON.parse(data.final_report_requisites);
  delete data.final_report_requisites;
  data.status = 7;
  data.audit_plan = parseInt(data.audit_plan);
  data.filled_objective = JSON.parse(data.filled_objective);
  data.audit_leader_sign = auditLeaderSign.filename;
  data.represent_sign = representSign.filename;
  try {
    const sql = "INSERT INTO final_reports SET ?";
    const response = await db.query(sql, data);
    const final_report_id = response.insertId;
    final_report_requisites.forEach(async (element) => {
      element.final_report_id = final_report_id;
      await db.query("INSERT INTO final_report_requisites SET ?", [element]);
    });
    res.send("Reporte creado exitosamente!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};

const getFinal = async (req, res) => {
  try {
    const data = await db.query(
      "SELECT *,final_reports.id AS final_id FROM final_reports INNER JOIN audit_plans ON audit_plans.id = final_reports.audit_plan"
    );
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};

const getFindings = async (req, res) => {
  const requisite = req.body;
  const sql = `SELECT ff.details 
  FROM findings f
  LEFT JOIN finding_fields ff ON ff.findings_id = f.id
  WHERE  f.audit_plan= ? AND ff.requisite =?`;
  const toSend = [];
  try {
    for (let i = 0; i < requisite.length; i++) {
      var requisites = [];
      for (let j = 0; j < requisite[i].length; j++) {
        const element = requisite[i][j];
        const id = element.requisite_id;
        const plan_id = element.plan_id;
        const response = await db.query(sql, [plan_id, id]);
        var text = " ";
        for (let k = 0; k < response.length; k++) {
          const { details } = response[k];
          text += details;
        }
        element.details = text;
        requisites.push(element);
      }
      toSend.push(requisites);
    }
    res.send(toSend);
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};

const getOneFinalReport = async (req, res) => {
  const { id } = req.params;
  //Obtener el plan de auditoria
  const sqlPlan = `
        SELECT 
        ap.objective,
        ap.scope,
        ap.criteria,
        ap.leader,
        ap.validity,
        ap.id
        FROM final_reports fr
        LEFT JOIN audit_plans ap ON ap.id = fr.audit_plan
        WHERE fr.id = ?`;

  //obtener los auditores
  const sqlAudit = `
     SELECT i.job,
     i.id,
     i.full_name
     FROM final_reports fr 
     LEFT JOIN audit_plan_has_inspectors aphi ON aphi.audit_plan_id  = fr.audit_plan
     LEFT JOIN inspectors i ON i.id = aphi.inspectors_id
     WHERE fr.id= ?`;

  //Obtener informacion del reporte final
  const sqlReport = `SELECT  * FROM final_reports WHERE id = ?`;
  //obtenes los procesos no conformes de lo fields
  const sqlProcess = `
  SELECT final_report_requisites.*,
	processes.name FROM  final_report_requisites 
  LEFT JOIN processes ON processes.id =  final_report_requisites.process_id
  WHERE final_report_id = ?`;

  try {
    const auditPlan = await db.query(sqlPlan, [id]);
    const inspectors = await db.query(sqlAudit, [id]);
    const finalReport = await db.query(sqlReport, [id]);
    const requisites = await db.query(sqlProcess, [id]);

    const toSend = {
      finalReport,
      auditPlan,
      inspectors,
      requisites,
    };

    res.send(toSend);
  } catch (error) {
    console.log(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};
module.exports = {
  getFinal,
  getOneFinal,
  createFinal,
  getFindings,
  getOneFinalReport,
};

// SELECT  processes.name as process_name,
// r.name as article_name,
// r.article,
// r.type,
// r.id AS requisite_id,
// processes.id as process_id
// FROM audit_plan_fields apf
// INNER JOIN processes on processes.id =apf.processes_id
// INNER JOIN process_has_requisites  phr ON phr.process_id = processes.id
// LEFT JOIN requirements r ON r.id = phr.requisite_id
// WHERE apf.audit_plan_id = ?

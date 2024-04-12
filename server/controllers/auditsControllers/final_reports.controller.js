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
        ap.validity
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
    console.log(toSend);
    res.send(toSend);

  } catch (error) {
    console.log(error)
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
};
const createFinal = async (req, res) => {};

const getFinal = async(req,res)=>{
try {
    const data = await db.query("SELECT * FROM final_reports INNER JOIN audit_plans ON audit_plans.id = final_reports.audit_plan");
    res.send(data)
} catch (error) {
    console.log(error)
    res.status(500).send("Tuvimos un error, intenta mas tarde")
    
}
}

module.exports = {
  getFinal,
  getOneFinal,
  createFinal,
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

const db = require("../../dbControl");

const createPlan = async (req, res) => {
  try {
    const data = req.body;
    //plan
    const auditPlan = data.audit_plan;
    const risk = auditPlan.risk;
    const audit_group = auditPlan.audit_group;
    auditPlan.status = 1;
    delete auditPlan.risk;
    delete auditPlan.audit_group;
    //campos
    const fields = data.plan_fields;
    fields.map((e) => {
      delete e.process_name;
    });
    //Sqls
    const sqlPlan = "INSERT INTO audit_plans SET ?";
    const planInspectors = "INSERT INTO audit_plan_has_inspectors SET ?";
    const riskPlans = "INSERT INTO risks SET ?";
    const emergency_plan = "INSERT INTO emergency_plans SET ? ";
    const fieldsInsert = "INSERT INTO audit_plan_fields SET ?";
    const fieldsInspector =
      "INSERT INTO inspectors_has_audit_plan_fields  SET ?";

    //1. Guardar el plan de auditoria
    const planRes = await db.query(sqlPlan, auditPlan);
    const planId = planRes.insertId;
    //1.1 Guardar los auditores  del plan de auditoria
    audit_group.forEach(async (e) => {
      try {
        await db.query(planInspectors, [
          { audit_plan_id: planId, inspectors_id: e },
        ]);
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    });

    //1.2 Guardar los riesgos y los planes de contingencia
    risk.forEach(async (rp) => {
      try {
        const riskId = await db.query(riskPlans, [
          { name: rp.risk, audit_plan_id: planId },
        ]);
        await db.query(emergency_plan, [
          { name: rp.plan, risk_id: riskId.insertId },
        ]);
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    });

    //2. Guardar campos del plan
    fields.forEach(async (f) => {
      try {
        const auditores = f.inspectors;
        delete f.inspectors;
        f.audit_plan_id = planId;
        //2.1 Guardar campos
        const resField = await db.query(fieldsInsert, [f]);
        const fieldId = resField.insertId;
        //2.2 guardar auditores
        auditores.forEach(async (au) => {
          try {
            await db.query(fieldsInspector, [
              {
                inspectors_id: au.inspector,
                audit_plan_fields_id: fieldId,
                audit_plan_id: planId,
                inspectors_rols_id: au.rol,
              },
            ]);
          } catch (error) {
            console.error(error);
            throw new Error(error);
          }
        });
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    });
    //Unir el plan creado a el programa
    await db.query(
      `UPDATE audit_program_fields SET audit_plan_id = ${planId} WHERE id = ${data.audit_program_fields}`
    );
    res.send("Plan de auditoria creado correctamente!!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Tuvimos un errror intenta mas tarde");
  }
};

const getPlan = async (req, res) => {
  try {
    const plan = await db.query(
      "SELECT *,(SELECT username FROM users WHERE users.id = audit_plans.created_by) AS created_by_name FROM audit_plans"
    );
    const callback = (data) => {
      res.send(data);
    };
    await getPlanData(plan, callback);
  } catch (error) {
    console.error(error);
    res.status(500).send("Tuvimos un errror intenta mas tarde");
  }
};

const getOnePlan = async (req, res) => {
  try {
    const id = req.params.id;
    const plan = await db.query(
      `SELECT audit_plans.* FROM audit_plans INNER JOIN audit_program_fields ON audit_program_fields.audit_plan_id = audit_plans.id WHERE audit_program_fields.id = ? OR audit_plans.id= ? `,
      [id, id]
    );
    const callback = (data) => {
      res.send(data);
    };
    await getPlanData(plan, callback);
  } catch (error) {
    console.error(error);
    res.status(500).send("Tuvimos un errror intenta mas tarde");
  }
};

//Funtions
//Esta funcion es para traer todos los datos del plan de auditoria, auditores,riesgos y planes de contingencia ,los proceesos a auditar con sus auditores y criterios
const getPlanData = async (plan, callback) => {
  const res = plan.map(async (e) => {

    //buscar el grupo de auditores
    const inspectors = await db.query(
      `SELECT i.* 
      FROM audit_plan_has_inspectors 
      JOIN inspectors i ON i.id = audit_plan_has_inspectors.inspectors_id 
      WHERE audit_plan_has_inspectors.audit_plan_id = ?`,
      [e.id]
    );
 
    e.audit_group = inspectors;
    //buscar pplanes y riesgos
    const riskAndPlan = await db.query(
      `SELECT risks.id AS risk_id,risks.name As risk_name, e.name AS plan_name ,e.id AS plan_id FROM risks JOIN emergency_plans e ON e.risk_id =risks.id where risks.audit_plan_id =? `,
      [e.id]
    );
    e.riskAndPlan = riskAndPlan;

    //Buscar los procesos a auditatr
    const fields = await db.query(
      `SELECT *, 
      (SELECT name  FROM processes WHERE processes.id = audit_plan_fields.processes_id) AS process_name ,
      (SELECT count(*) FROM check_lists WHERE audit_plan = audit_plan_fields.id ) AS check_count,
      (SELECT id FROM check_lists WHERE audit_plan = audit_plan_fields.id ) AS check_list_id
      FROM  audit_plan_fields WHERE audit_plan_id = ?`,
      [e.id]
    );

    //de cada procesos buscar su auditor y su criterios
    const campos = fields.map(async (field) => {
      //auditores del procesos
      
      const field_inspectors = db.query(
        `SELECT insf.*,
        inspectors.full_name,
        inspectors_rols.initials,
        inspectors_rols.name
        FROM inspectors_has_audit_plan_fields insf
        INNER JOIN inspectors ON inspectors.id = insf.inspectors_id 
        INNER JOIN inspectors_rols ON inspectors_rols.id = insf.inspectors_rols_id 
        WHERE audit_plan_id = ? AND audit_plan_fields_id = ?`,
        [field.audit_plan_id,field.id]
      );

      //Criterios del proceso
      const requirements = db.query(
        "SELECT p.* FROM process_has_requisites pr INNER JOIN processes p ON p.id = pr.process_id WHERE p.id = ?",
        [field.processes_id]
      );

      const f = await Promise.all([field_inspectors, requirements]).then(
        (f) => {
          field.field_inspector = f[0];
          field.reqs = f[1];
          return field;
        }
      );
      return f;
    });

    await Promise.all(campos).then((camp) => {
      e.fields = camp;
    });

    return e;
  });

  Promise.all(res).then((res) => {
    callback(res);
  });
};

module.exports = {
  createPlan,
  getPlan,
  getOnePlan,
};

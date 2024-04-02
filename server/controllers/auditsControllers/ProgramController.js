const db = require("../../dbControl.js");

const createProgram = async (req, res) => {
  //crear programa de auditoria
  try {
    //Datos
    const data = req.body;
    const auditProgram = data.audit_programs;
    const fields = data.audit_programs_fields;

    //Formateo
    auditProgram.validity = new Date(auditProgram.validity)
      .toISOString()
      .split("T")[0];

    //SQL's
    const programSql = "INSERT INTO audit_programs SET ?";
    const fieldsSql = "INSERT INTO audit_program_fields SET ?";
    const inspectorSql = "INSERT INTO inspectors_has_audit_programs SET ?";

    //Insercion de datos

    const ProgramResult = await db.query(programSql, [auditProgram]);
    var field_id;
    for (const key in fields) {
      //Auditores para este proceso
      const inspectors = [];
      const e = fields[key];
      e.date = new Date(e.date).toISOString().split("T")[0];
      //id del programa de auditoria
      e.audit_programs_id = ProgramResult.insertId;

      e.inspectors_id.forEach((element) => {
        inspectors.push(element);
      });
      e.status = 1;
      delete e.inspectors_id;
      //Guardar el proceso
      const fieldsResult = await db.query(fieldsSql, [e]);
      const processid = fieldsResult.insertId;

      inspectors.forEach(async (id) => {
        const result = await db.query(inspectorSql, [
          { inspector_id: id, audit_program_field_id: processid },
        ]);
        console.log(result);
      });
    }
    res.send("Programa de auditoria creado con exito!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }

  //crear fields
  //agregar auditores
};
const getProgramsAndFields = async (req, res) => {
  try {
    const sql = `SELECT *,(SELECT name FROM params WHERE id = audit_programs.status) AS status_name FROM audit_programs  WHERE status = 1`;
    const result = await db.query(sql);
    res.send(result);
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.error(error);
  }
};
const getOneProgram = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM audit_programs WHERE id = ${id}`;
    const resultProgram = await db.query(sql);

    const fields = await db.query(
    `SELECT *,
    (SELECT name FROM processes WHERE processes.id = a.processes_id) AS process_name,
    (SELECT name FROM params WHERE params.id = a.type) AS type_name,
    (SELECT name FROM params WHERE params.id = a.status) AS status_name, 
    (SELECT COUNT(*) FROM audit_plans WHERE audit_plans.id = a.audit_plan_id) AS plansQty 
    FROM audit_program_fields as a WHERE a.audit_programs_id = ?`,
      [id]
    );
    const FIELDS = await fields.map(async (e) => {
      const inspectors = await db.query(
        "SELECT *,(SELECT full_name FROM inspectors WHERE id = inspector_id) AS inspector_name FROM inspectors_has_audit_programs WHERE audit_program_field_id = ?",
        [e.id]
      );

      e.inspectors = inspectors;

      return e;
    });
 
    Promise.all(FIELDS).then((fields)=>{
      const result = {
        program: resultProgram,
        fields
      };
      res.send(result);
    });

  
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.error(error);
  }
};

const addProgram = async(req,res)=>{
  try {
    const ProgramSql = "INSERT INTO audit_program_fields SET ?"
    const inspectSql = "INSERT INTO inspectors_has_audit_programs SET ?"
    const data = req.body;
    const inspectors = data.inspectors_id
    delete data.inspectors_id
    const response = await db.query(ProgramSql,[data]);
    const id = response.insertId
    inspectors.forEach(async(e)=> {
       await db.query(inspectSql,[{
        inspector_id:e,
        audit_program_field_id:id
      }])
    });
    res.send("Proceso agregado correctamente")
  } catch (error) {
    console.error(error);
    res.status(500).send("Tuvimos un error, intenta mas tarde");
  }
}
const getByDate = async(req,res)=>{
  try {
    const date = req.body.date

     const programs = await db.query(`SELECT *,(SELECT name FROM processes WHERE processes.id = processes_id) AS process_name,(SELECT leader FROM audit_plans WHERE audit_plans.id =audit_plan_fields.audit_plan_id) AS leader FROM audit_plan_fields WHERE date ='${date}'`);
    res.send(programs)
  } catch (error) {
    console.error(error);
    res.status(500).send("Tuvimos un error obteniendo los programas para esa fecha, intenta mas tarde");
  }
}
const getProgramFields = async(req,res)=>{
  try {

     const programs = await db.query(`SELECT *,(SELECT name FROM processes WHERE processes.id = processes_id) AS process_name,(SELECT leader FROM audit_plans WHERE audit_plans.id =audit_plan_fields.audit_plan_id) AS leader FROM audit_plan_fields `);
    res.send(programs)
  } catch (error) {
    console.error(error);
    res.status(500).send("Tuvimos un error obteniendo los programas para esa fecha, intenta mas tarde");
  }
}
module.exports = {
  createProgram,
  getProgramsAndFields,
  getOneProgram,
  addProgram,
  getByDate,
  getProgramFields
};

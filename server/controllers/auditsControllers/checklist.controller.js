const db = require("../../dbControl.js");

const createCheckList = async (req, res) => {
  const check = req.body.checkList;

  const checkSql = "INSERT INTO check_lists SET ?";
  const fieldSql = "INSERT INTO check_list_fields SET ?";
  try {
    //guardar la lista de chequeo
    const check_res = await db.query(checkSql, [check]);
    // id de la lista
    const check_id = check_res.insertId;

    //Insertar el id en los campos

    const fields = req.body.fields.map((f) => {
      f.check_list_id = check_id;
      return f;
    });

    for (const field of fields) {
      await db.query(fieldSql, [field]);
    }
    await db.query(
      `UPDATE audit_plan_fields SET check_list_id = ${check_id} WHERE audit_plan_fields.id = ${check.audit_plan}`
    );
    res.send("Lista de chequeo creada correctamente! ");
  } catch (error) {
    console.error(error);
    res.status(500).send("Tuvimos un error, por favor intenta mas tarde...");
  }
};
const getChecklists = async (req, res) => {
  try {
    const lists = await db.query(`SELECT au.date, cl.status,cl.id,
    (SELECT leader FROM audit_plans WHERE  audit_plans.id = au.audit_plan_id) AS leader,
    (SELECT name FROM processes WHERE id = au.processes_id) AS process_name,
    (SELECT name FROM params WHERE params.id =cl.status ) AS status_name
    FROM check_lists  cl
    INNER JOIN audit_plan_fields au ON au.id = cl.audit_plan `);
    res.send(lists);
  } catch (error) {
    console.error(error);
    res.status(500).send("Tuvimos un error, por favor intenta mas tarde...");
  }
};
const editChecklist = async (req, res) => {
  const check_id = req.params.id
  const check_status = req.body.checkList.status
  const fields = req.body.fields

  const fieldSql = `UPDATE check_list_fields SET ? WHERE check_list_fields.id = ?  `;
  try {
    await db.query("UPDATE check_lists SET status = ? WHERE id = ?",[check_status,check_id])
    for (const field of fields) {
      const id = field.id;
      delete field.id
    
       await db.query(fieldSql, [field,id]);
    }
 
    res.send("Lista de chequeo editada correctamente! ");
  } catch (error) {
    console.error(error);
    res.status(500).send("Tuvimos un error, por favor intenta mas tarde...");
  }
};

const getOneCheck = async (req, res) => {
  const id = req.params.id;
  try {
    const sql = `SELECT  ckl.*, apf.date, apf.processes_id,
    (SELECT name FROM processes WHERE processes.id = apf.processes_id) AS process_name,
    (SELECT leader FROM audit_plans WHERE  audit_plans.id = apf.audit_plan_id) AS leader,
    (SELECT name FROM params WHERE params.id =ckl.status ) AS status_name
    FROM check_lists ckl
    LEFT JOIN  audit_plan_fields apf ON apf.id = ckl.audit_plan
    WHERE ckl.id = ? `;
    const checklist = await db.query(sql, [id]);
    const check_id = checklist[0].id;

    const fields = await db.query(
      `SELECT *,
    (SELECT article FROM requirements r WHERE r.id = ck.iso_9001) AS iso9001_article, 
    (SELECT article FROM requirements r WHERE r.id = ck.iso_45001) AS iso45001_article, 
    (SELECT article FROM requirements r WHERE r.id = ck.decreto) AS decreto_article,
    (SELECT type FROM requirements r WHERE r.id = ck.iso_9001) AS iso9001_type, 
    (SELECT type FROM requirements r WHERE r.id = ck.iso_45001) AS iso45001_type, 
    (SELECT type FROM requirements r WHERE r.id = ck.decreto) AS decreto_type
    FROM check_list_fields ck 
    WHERE ck.check_list_id = ?`,
      [check_id]
    );

    res.send({
      checklist,
      fields,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Tuvimos un error, por favor intenta mas tarde...");
  }
};
module.exports = {
  createCheckList,
  getChecklists,
  editChecklist,
  getOneCheck,
};

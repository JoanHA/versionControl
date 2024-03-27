const db = require("../../dbControl.js");

const getProcess = async (req, res) => {
  try {
    const params = await db.query(
      `SELECT p.* FROM  processes p WHERE p.status = 1`
    );

    const ps = params.map(async (p) => {
      const articles = await db.query(`SELECT article from requirements r
        LEFT JOIN process_has_requisites pr ON pr.process_id = ${p.id}
        WHERE r.id = pr.requisite_id`);
      p.articles = articles;
      
      return p;
    });
    Promise.all(ps).then((param) => {
      res.send(param);
    });
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.error(error);
  }
};
const getOneProcess = async (req, res) => {
  try {
    const id = req.params.id;
    const params = await db.query(
      `SELECT p.* FROM processes p WHERE p.status = 1 AND p.id =?`,
      [id]
    );
    const ps = params.map(async (p) => {
      const articles = await db.query(`SELECT article, r.id, r.type,(SELECT name from params where id = r.type) AS type_name  from requirements r
            LEFT JOIN process_has_requisites pr ON pr.process_id = ${p.id}
            WHERE r.id = pr.requisite_id`);
      p.articles = articles;
      return p;
    });
    Promise.all(ps).then((param) => {
      res.send(param);
    });
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.error(error);
  }
};
const getReq = async (req, res) => {
  try {
    const id = req.params.id;
    const requirements = await db.query(
      "SELECT * FROM process_has_requisites pr INNER JOIN requirements r ON r.id = pr.requisite_id WHERE process_id = ? ",
      [id]
    );
  
    res.send(requirements);
  } catch (error) {
    res.status(500).send("Tuvimos un error, intenta mas tarde");
    console.error(error);
  }
};
const getAllReq = async (req, res) => {
  try {
    const requirements = await db.query("SELECT * FROM requirements");
    res.send(requirements);
  } catch (error) {
    res.status(500).send("Tuvimos al traer los requsitos, intenta mas tarde");
    console.error(error);
  }
};
const getCriteriaTypes = async (req, res) => {
  try {
    const types = await db.query("SELECT * FROM params WHERE paramtype_id = 9");
    res.send(types);
  } catch (error) {
    res
      .status(500)
      .send("Tuvimos al traer tipos de requsitos, intenta mas tarde");
    console.error(error);
  }
};
const createReq = async (req, res) => {
  try {
    const datos = req.body;
    await db.query("INSERT INTO requirements SET ?", [datos]);

    res.send("Requisito creado con exito!");
  } catch (error) {
    res
      .status(500)
      .send("Tuvimos al traer tipos de requsitos, intenta mas tarde");
    console.error(error);
  }
};
const createProcess = async (req, res) => {
  try {
    const datos = req.body;
    const process_id = await db.query("INSERT INTO processes SET ?", [
      { name: datos.name },
    ]);

    datos.iso9.map(async (iso) => {
      await db.query("INSERT INTO process_has_requisites SET ? ", [
        {
          process_id: process_id.insertId,
          requisite_id: iso.value,
        },
      ]);
    });
    datos.iso4.map(async (iso) => {
      await db.query("INSERT INTO process_has_requisites SET ? ", [
        {
          process_id: process_id.insertId,
          requisite_id: iso.value,
        },
      ]);
    });
    datos.decreto.map(async (iso) => {
      await db.query("INSERT INTO process_has_requisites SET ? ", [
        {
          process_id: process_id.insertId,
          requisite_id: iso.value,
        },
      ]);
    });
    res.send("Proceso creado con exito!");
  } catch (error) {
    res
      .status(500)
      .send("Tuvimos al traer tipos de requsitos, intenta mas tarde");
    console.error(error);
  }
};
const editProcess = async (req, res) => {
  try {
    const process_id = req.params.id
    const datos = req.body;
    const proces = await db.query("UPDATE processes SET ? WHERE id = ?", [{ name: datos.name },process_id]);
    console.log(datos);
    if (datos.iso9.length > 0) {
      datos.iso9.map(async(iso)=>{
        await db.query("INSERT INTO process_has_requisites SET ? ",[
            {
                process_id:process_id,
                requisite_id:iso.value
            }
        ])
    })

    }
   
    if (datos.iso4.length > 0) {
      datos.iso4.map(async(iso)=>{
        await db.query("INSERT INTO process_has_requisites SET ? ",[
            {  
                process_id:process_id,
                requisite_id:iso.value
            }
        ])
    })
   

    }
  if (datos.decreto.length > 0) {
    datos.decreto.map(async(iso)=>{
      await db.query("INSERT INTO process_has_requisites SET ? ",[
          {
              process_id:process_id,
              requisite_id:iso.value
          }
      ])
    })

  }
    
    res.send("Proceso editado con exito!");
  } catch (error) {
    res
      .status(500)
      .send("Tuvimos al traer tipos de requsitos, intenta mas tarde");
    console.error(error);
  }
};
module.exports = {
  getProcess,
  getReq,
  getAllReq,
  createReq,
  getCriteriaTypes,
  createProcess,
  editProcess,
  getOneProcess
};

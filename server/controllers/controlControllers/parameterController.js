const db = require("../../dbControl");
const helper = require("../../lib/helpers");

const createParam = async (req,res)=>{
    console.log(req.body)
    res.send("Recibido en parametros")
}
module.exports = {
    createParam
};

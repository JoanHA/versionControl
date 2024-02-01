const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const helper ={}

helper.encypt = async (password)=>{
    const salt = await bcrypt.genSalt(8)
    const hash  = await bcrypt.hash(password,salt)
    return hash;
}

helper.compare = async (password,passwordHash)=>{
    const result = await bcrypt.compare(password,passwordHash)
    return result;

}

helper.convertTime = (timeStamp)=>{
  const date = new Date(timeStamp);

      // Obtiene los componentes de la fecha (año, mes y día)
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth() + 1; // Sumamos 1 para que enero sea 1, febrero 2, etc.
      const day = date.getUTCDate();

      // Formatea la fecha como "YYYY/MM/DD"
      const formattedDate = `${year}/${month
        .toString()
        .padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
      return formattedDate;
}
helper.convertDate = (Stringdate)=>{
  if (Stringdate == null || Stringdate =="") {
    return null;
  }
  const año = Stringdate.toString().substring(0,4)
  const mes = Stringdate.toString().substring(4,6)
  const dia = Stringdate.toString().substring(6,8)
  const fecha = (`${año}-${mes}-${dia}`)
  return fecha
}

helper.removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 
helper.createToken = (payload)=>{
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 
        process.env.JWT_SECRET,{
            expiresIn: "1d"
        }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
  });
};



module.exports = helper
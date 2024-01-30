const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

//------------------------------API v2 -------------------------

const documentRoute = require("./routes/controlRoutes/documents.js")
const auxiliarRoute = require("./routes/controlRoutes/auxiliars.js")
const changesRoute = require("./routes/controlRoutes/changes.js")
const authRoute = require("./routes/controlRoutes/auth.js")
const recoverRoute = require("./routes/controlRoutes/recover.js")
const paramRoute = require("./routes/controlRoutes/parameters.js")
const usersRoute = require("./routes/controlRoutes/users.js")
//------------------------------API v2 -------------------------



//initialize
const app = express();
app.set("port", process.env.PORT);

//middlewares

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public/uploads")));


//Control API v2-------------------------------

//Routes for documents

app.use("/api/v2/documents",documentRoute)
app.use("/api/v2/auxiliars",auxiliarRoute)
app.use("/api/v2/changes",changesRoute)
app.use("/api/v2/auth",authRoute);
app.use("/api/v2/recover",recoverRoute);
app.use("/api/v2/parameters",paramRoute);
app.use("/api/v2/users",usersRoute);

//Control API v2-------------------------------

//Server listening
app.listen(app.get("port") || 3000, () => {
  console.log(`listening on port ${process.env.PORT}`);

});

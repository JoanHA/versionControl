const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

//------------------------------API v2 -------------------------

const documentRoute = require("./routes/controlRoutes/documents.js");
const auxiliarRoute = require("./routes/controlRoutes/auxiliars.js");
const changesRoute = require("./routes/controlRoutes/changes.js");
const authRoute = require("./routes/controlRoutes/auth.js");
const recoverRoute = require("./routes/controlRoutes/recover.js");
const paramRoute = require("./routes/controlRoutes/parameters.js");
const usersRoute = require("./routes/controlRoutes/users.js");
const controlsRoute = require("./routes/controlRoutes/controls.js");
//------------------------------API v2 -------------------------

//------------------------------API v3 -------------------------
const auditParams = require("./routes/auditsRoutes/AuditParams.js");
const inspectors = require("./routes/auditsRoutes/inspectors.js");
const processes = require("./routes/auditsRoutes/processes.js");
const programRoute = require("./routes/auditsRoutes/ProgramRoute.js");
const planRoute = require("./routes/auditsRoutes/plansRoute.js")
const checkRoute = require("./routes/auditsRoutes/checklist.route.js")
//------------------------------API v3 -------------------------

//initialize
const app = express();
app.set("port", process.env.PORT);

//middlewares

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public/")));

//Control API v2-------------------------------
//Routes for documents
app.use("/api/v2/documents", documentRoute);
app.use("/api/v2/auxiliars", auxiliarRoute);
app.use("/api/v2/changes", changesRoute);
app.use("/api/v2/auth", authRoute);
app.use("/api/v2/recover", recoverRoute);
app.use("/api/v2/parameters", paramRoute);
app.use("/api/v2/users", usersRoute);
app.use("/api/v2/controls", controlsRoute);
//Control API v2-------------------------------

const APIV3ENPOINT = "/api/v2";
//AUDITS API v3--------------------------------
app.use(`${APIV3ENPOINT}/auditsParams`, auditParams);
app.use(`${APIV3ENPOINT}/inspectors`, inspectors);
app.use(`${APIV3ENPOINT}/process`, processes);
app.use(`${APIV3ENPOINT}/programs`, programRoute);
app.use(`${APIV3ENPOINT}/plans`, planRoute);
app.use(`${APIV3ENPOINT}/checklist`, checkRoute);

//AUDITS API v3--------------------------------

//Server listening
app.listen(app.get("port") || 3000, async () => {
  console.log(`listening on port ${process.env.PORT}`);
});

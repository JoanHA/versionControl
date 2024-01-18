const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

//------------------------------API v2 -------------------------

const documentRoute = require("./routes/controlRoutes/documents.js")
const auxiliarRoute = require("./routes/controlRoutes/auxiliars.js")

//------------------------------API v2 -------------------------



//initialize
const app = express();
app.set("port", process.env.PORT);

//middlewares

app.use(cors());
// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Control API v2-------------------------------

//Routes for documents
app.use("/api/v2/documents",documentRoute)
app.use("/api/v2/auxiliars",auxiliarRoute)

//Control API v2-------------------------------

//Server listening
app.listen(app.get("port") || 3000, () => {
  console.log(`listening on port ${process.env.PORT}`);

});

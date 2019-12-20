const express = require("express");
const bodyParser = require("body-parser");
const HttpStatus = require("http-status-codes");
const cors = require("cors");
const { respondWithWarning } = require("./helpers/responseHandler");
const { PORT } = require("./config/constants");
const connectDB = require("./config/db");
const Route = require("./routes/routes");

const port = PORT || 5000;
const app = express();

connectDB();

const logger = require('morgan');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", Route);
app.use("/", (_req, res) =>
  respondWithWarning(res, HttpStatus.NOT_FOUND, "Incorrect route")
);

app.listen(port, () => console.log(`Web service started on port ${port}`));

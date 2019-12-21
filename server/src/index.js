const express = require("express");
const bodyParser = require("body-parser");
const HttpStatus = require("http-status-codes");
const cors = require("cors");
const { respondWithWarning } = require("./helpers/responseHandler");
const { PORT } = require("./config/constants");
const connectDB= require("./config/db");
const Route = require("./routes/routes");

const path = require("path");


const session = require('express-session');
var cookieSession = require('cookie-session');
const MongoDBStore = require('connect-mongodb-session')(session);
//var MongoDBStore = require('connect-mongodb-session')(session);
const port = PORT || 5000;
const app = express();

const mongoose =require("mongoose");

connectDB();

const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

//app.use(cookieParser());





app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(cookieSession({
    name: 'session',
    keys: [process.env.SECRET_KEY]
}));




app.use("/college_admin/", require("./routes/web"));
app.use("/applicant/", require("./routes/applicant_routes"));

app.use(cors());

app.use("/api/v1", Route);







app.use("/", (_req, res) =>
  respondWithWarning(res, HttpStatus.NOT_FOUND, "Incorrect route")
);

app.listen(port, () => console.log(`Web service started on port ${port}`));

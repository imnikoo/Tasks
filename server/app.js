const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/project.js');
const programmerRoutes = require('./routes/programmer.js');
mongoose.Promise = require('q').Promise;
const app = express();

let options = {
   useMongoClient: true,
};
if (process.env.NODE_ENV === 'test') {
   mongoose.connect('mongodb://localhost/testtasks2', options);
} else {
   mongoose.connect('mongodb://localhost/devtasks2', options);
   app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
}

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(projectRoutes);
app.use(programmerRoutes);

module.exports = app;
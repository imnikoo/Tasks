let mongoose = require('mongoose');
let Task = require('./task').schema;
let Programmer = require('./programmer').schema;
let Schema = mongoose.Schema;

let ProjectScheme = new Schema (
   {
      name: { type: String, required: true },
      client: { type: String, required: true},
      projectType: {type: String, enum: ['eCommerce', 'Portal', 'Entertainment', 'Soft'], required: true, default: 'Soft'},
      status: { type: String, enum: ['New', 'InProgress', 'Completed'], required: true, default: 'New' },
      tasks: { type: [Task] },
      startedAt: {type: Date, required: true },
      finishedAt: {type: Date},
      income: {type: Number},
      team: { type: [Programmer]}
   }
);

module.exports = mongoose.model('Project', ProjectScheme);
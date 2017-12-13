let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TaskScheme = new Schema (
   {
      title: { type: String, required: true },
      status: { type: String, enum: ['New', 'InProgress', 'Completed'], required: true, default: 'New' },
      complexity: { type: Number, enum: [1, 2, 3, 4, 5], required: true, default: 1},
      createdAt: { type: Date, default: Date.now },
      editedAt: { type: Date },
      plannedDeadline: { type: Date, required: true},
      actualDeadline: { type: Date },
      programmerId: { type: String },
   }
);

module.exports = mongoose.model('Task', TaskScheme);
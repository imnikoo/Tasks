let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProgrammerScheme = new Schema (
   {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true }
   }
);

module.exports = mongoose.model('Programmer', ProgrammerScheme);
const Programmer = require('../model/programmer.js');
const forIn = require('lodash/forIn');
const hasIn = require('lodash/hasIn');

const getAll = (req, res) => {
   Programmer.find({})
      .then(programmers => res.send(programmers))
      .catch(err => res.send(err));
};

const get = (req, res) => {
   let programmerId = req.params.id;
   Programmer.findById(programmerId)
      .then(programmer => {
         if (programmer) {
            res.status(200).send(programmer)
         }
         res.status(404).send();
      })
      .catch(err =>
         res.send(err)
      )
};

const post = (req, res) => {
   let newProgrammer = new Programmer();
   newProgrammer.firstName = req.body.firstName;
   newProgrammer.lastName = req.body.lastName;
   
   newProgrammer.save()
      .then(programmer => res.status(200).send(programmer))
      .catch(err => res.send(err));
};

const put = (req, res) => {
   let programmerId = req.params.id;
   Programmer.findById(programmerId)
      .then(programmer => {
         if (!programmer) {
            res.status(404).send();
         }
         forIn(req.body, (value, key) => {
            if (hasIn(programmer, key) && hasIn(req.body, key)) {
               programmer[key] = value;
            }
         });
         return programmer.save();
      })
      .then(updProgrammer => res.status(200).send(updProgrammer))
      .catch(err => res.status(500).send(err));
};

const remove = (req, res) => {
   let programmer = req.params.id;
   
   Programmer.remove({_id: programmer})
      .then((result) => res.status(200).send(result))
      .catch(err => res.status(404).send(err))
};

module.exports = {
   getAll,
   get,
   post,
   put,
   remove
};
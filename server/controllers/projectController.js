const Project = require('../model/project.js');
const forIn = require('lodash/forIn');
const hasIn = require('lodash/hasIn');

const getAll = (req, res) => {
   Project.find({})
      .then(projects => res.send(projects))
      .catch(err => res.send(err));
};

const get = (req, res) => {
   let projectId = req.params.id;
   Project.findById(projectId)
      .then(project => {
         if (project) {
            res.status(200).send(project)
         }
         res.status(404).send();
      })
      .catch(err =>
         res.send(err)
      )
};

const post = (req, res) => {
   let project = new Project();
   project.name = req.body.name;
   project.client = req.body.client;
   project.status = req.body.status;
   project.projectType = req.body.projectType;
   project.tasks = req.body.tasks;
   project.team = req.body.team;
   project.startedAt = req.body.startedAt;
   project.finishedAt = req.body.finishedAt;
   project.income = req.body.income;
   
   project.save()
      .then(project => res.status(200).send(project))
      .catch(err => res.send(err));
};

const put = (req, res) => {
   let projectId = req.params.id;
   Project.findById(projectId)
      .then(project => {
         if (!project) {
            res.status(404).send();
         }
         forIn(req.body, (value, key) => {
            if (hasIn(project, key) && hasIn(req.body, key)) {
               project[key] = value;
            }
         });
         return project.save();
      })
      .then(updProject => res.status(200).send(updProject))
      .catch(err => res.status(500).send(err));
};

const remove = (req, res) => {
   let project = req.params.id;
   
   Project.remove({_id: project})
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
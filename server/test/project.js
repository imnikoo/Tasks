//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");

let Project = require('../model/project');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
let expect = chai.expect;
const _ = require('lodash');

chai.use(chaiHttp);

describe('Project', () => {
   beforeEach((done) => {
      Project.remove({}, () => {
         done();
      });
   });
   
   describe('/PUT project', () => {
      it('it should change project with id', (done) => {
         let project = Object.assign(new Project(), {
            name: 'name',
            client: 'client',
            projectType: 'Portal',
            teamId: '1',
            startedAt: new Date(),
            income: 5000
         });
         project.save().then(project => {
            chai.request('http://localhost:9000/')
               .put(`api/project/${project._id}`)
               .type('application/json')
               .send({
                  name: 'new name',
                  client: 'new client'
               })
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.an('object');
                  res.body.should.have.property('name').that.does.equal('new name');
                  res.body.should.have.property('client').that.does.equal('new client');
                  done();
               });
         })
      });
   
      it('it should change project with id (add tasks)', (done) => {
         let project = Object.assign(new Project(), {
            name: 'name',
            client: 'client',
            projectType: 'Portal',
            teamId: '1',
            startedAt: new Date(),
            income: 5000
         });
         project.save().then(project => {
            chai.request('http://localhost:9000/')
               .put(`api/project/${project._id}`)
               .type('application/json')
               .send({
                  tasks: [{
                     title: 'task',
                     status: 'InProgress',
                     complexity: 3,
                     plannedDeadline: new Date(),
                     programmerId: '1'
                  }]
               })
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.an('object');
                  res.body.should.have.property('tasks').to.be.an('array');
                  done();
               });
         })
      });
   });
   
   describe('/POST project', () => {
      it('it should create a project', (done) => {
         chai.request('http://localhost:9000/')
            .post('api/project/')
            .send({
               name: 'name',
               client: 'client',
               projectType: 'Portal',
               teamId: '1',
               startedAt: new Date(),
               income: 5000
            })
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.an('object');
               res.body.should.have.property('name').that.does.equal('name');
               res.body.should.have.property('client').that.does.equal('client');
               res.body.should.have.property('projectType').that.does.equal('Portal');
               done();
            });
      })
   });
   
   describe('/GET projects', () => {
      it('it should GET all the projects', (done) => {
         chai.request('http://localhost:9000/')
            .get('api/project/')
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.an('array');
               done();
            });
      });
      
      it('it should GET project by id', (done) => {
         Object.assign(new Project(), {
               name: 'name',
               client: 'client',
               projectType: 'Portal',
               teamId: '1',
               startedAt: new Date(),
               income: 5000
            })
            .save().then((project) => {
            chai.request('http://localhost:9000/')
               .get(`api/project/${project._id}`)
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('name').that.does.equal('name');
                  res.body.should.have.property('client').that.does.equal('client');
                  res.body.should.have.property('projectType').that.does.equal('Portal');
                  done();
               });
         });
      });
   });
});
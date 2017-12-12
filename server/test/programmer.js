//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");

let Programmer = mongoose.model('Programmer', require('../model/programmer').schema);

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
let expect = chai.expect;
const _ = require('lodash');

chai.use(chaiHttp);

describe('Programmer', () => {
   beforeEach((done) => {
      Programmer.remove({}, () => {
         done();
      });
   });
   
   describe('/PUT programmer', () => {
      it('it should change programmer with id', (done) => {
         let programmer = Object.assign(new Programmer(), {
            firstName: 'first name',
            lastName: 'lastName'
         });
         programmer.save().then(programmer => {
            chai.request('http://localhost:9000/')
               .put(`api/programmer/${programmer._id}`)
               .type('application/json')
               .send({
                  firstName: 'new first name',
                  lastName: 'new last name'
               })
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.an('object');
                  res.body.should.have.property('_id');
                  res.body.should.have.property('firstName').that.does.equal('new first name');
                  res.body.should.have.property('lastName').that.does.equal('new last name');
                  done();
               });
         })
      });
   });
   
   describe('/POST programmer', () => {
      it('it should create a programmer', (done) => {
         chai.request('http://localhost:9000/')
            .post('api/programmer/')
            .send({
               firstName: 'new first name',
               lastName: 'new last name'
            })
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.an('object');
               res.body.should.have.property('_id');
               res.body.should.have.property('firstName').that.does.equal('new first name');
               res.body.should.have.property('lastName').that.does.equal('new last name');
               done();
            });
      })
   });
   
   describe('/GET programmers', () => {
      it('it should GET all the projects', (done) => {
         chai.request('http://localhost:9000/')
            .get('api/programmer/')
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.an('array');
               done();
            });
      });
      
      it('it should GET programmer by id', (done) => {
         Object.assign(new Programmer(), {
               firstName: 'new first name',
               lastName: 'new last name'
            })
            .save().then((programmer) => {
            chai.request('http://localhost:9000/')
               .get(`api/programmer/${programmer._id}`)
               .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('_id');
                  res.body.should.have.property('firstName').that.does.equal('new first name');
                  res.body.should.have.property('lastName').that.does.equal('new last name');
                  done();
               });
         });
      });
   });
});
/**
 * Created by ASUS on 17/12/06.
 */
import React, {Component} from 'react';
import './styles.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Input from "../../components/Input/index";
import classnames from 'classnames';
import Form from "../../components/Form/index";
import {project_request_all, project_save_request} from "../../actions/project";
import ProgrammersList from "../../components/ProgrammersList/index";
import {staff_request_all} from "../../actions/staff";
import * as _ from 'lodash';
import {goBack} from "react-router-redux";
import q from 'q';

class Project extends Component {
   
   constructor(props, context) {
      super(props, context);
      
      this.state = {
         name: '',
         client: '',
         projectType: '',
         income: '',
         status: '',
         team: [],
         availableProgrammers: []
      };
      
      this.handleInputChange = this.handleInputChange.bind(this);
      this.createNewProject = this.createNewProject.bind(this);
      this.handleProgrammerClick = this.handleProgrammerClick.bind(this);
   }
   
   componentDidMount() {
      let promises = [];
      if (this.props.projectsOutOfdate || this.props.programmersListOutOfDate) {
         promises = [this.props.fetchProjects(), this.props.fetchProgrammers()];
      }
   
      q.all(promises).then(() => {
         let projectId = this.props.match.params.id;
         let newState = {};
         if(projectId) {
            let project = _.find(this.props.projects, ['_id', projectId]);
            newState = { ...project };
         }
         if(newState.team && newState.team.length) {
            console.log(this.props.programmers);
            let availableProgrammers = _.differenceWith(this.props.programmers, newState.team, (a, b) => {
               return a._id === b._id;
            });
            newState = { ...newState, availableProgrammers};
         } else {
            newState = { ...newState, availableProgrammers: this.props.programmers};
         }
         
         
         this.setState(newState);
      });
   }
   
   createNewProject() {
      let projectToSave = this.state;
      if (!this.state._id) {
         projectToSave = Object.assign({}, this.state, {
            status: 'New',
            startedAt: new Date()
         });
      }
      
      this.props.saveNewProject(projectToSave);
   };
   
   handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
   
      this.setState({
         [name]: value
      });
   }
   
   handleProgrammerClick (programmer) {
      this.setState((prevState) => {
         let isThereSuchProgrammer = _.some(prevState.team, p => {
            return p._id === programmer._id
         });
         if (!isThereSuchProgrammer) {
            return {
               team: [ ...prevState.team, programmer ],
               availableProgrammers: _.reject(prevState.availableProgrammers, ['_id', programmer._id])
            }
         } else {
            let newTeam = _.reject(prevState.team, ['_id', programmer._id]);
            return {
               team: newTeam,
               availableProgrammers: [ ...prevState.availableProgrammers, programmer ]
            }
         }
      })
   }
   
   render() {
      let formButtonTitle = this.state._id ? 'Save project' : 'Create project';
      
      return (
         <div className="project-container">
            
            <span className="project-title">Create project</span>
            
            <Form title="New project" handleAddClick={this.createNewProject}
                  isPending={this.props.isPending} buttonTitle={formButtonTitle}>
               <Input label={'Project name'} type="text" name="name" onChange={this.handleInputChange} value={this.state.name}/>
               <Input label={'Client'} type="text" name="client" onChange={this.handleInputChange} value={this.state.client}/>
   
               <select name="projectType" className={classnames({ 'form-select': true, selected: this.state.projectType })} value={this.state.projectType} onChange={this.handleInputChange}>
                  <option value="" disabled>Project type</option>
                  <option value="eCommerce">eCommerce</option>
                  <option value="Portal">Portal</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Soft">Soft</option>
               </select>
   
               <select name="status" className={classnames({ 'form-select': true, selected: this.state.status })} value={this.state.status} onChange={this.handleInputChange}>
                  <option value="" disabled>Status</option>
                  <option value="New">New</option>
                  <option value="InProgress">In progress</option>
                  <option value="Completed">Completed</option>
               </select>
               
               <Input type="number" label={'Income'} name="income" onChange={this.handleInputChange} value={this.state.income}/>
            </Form>
            
            <ProgrammersList title="Selected programmers" programmers={this.state.team} handleClick={this.handleProgrammerClick}/>
            <ProgrammersList programmers={this.state.availableProgrammers} handleClick={this.handleProgrammerClick}/>
            
            <div className="project-actions card">
               <button className="button" onClick={this.props.goBack}><i className="material-icons">arrow_back</i>Back</button>
            </div>
         
         </div>
      );
   }
}

const mapStateToProps = state => ({
   projects: state.project.projects,
   programmers: state.staff.programmers,
   programmersListOutOfDate: state.staff.outOfDate,
   projectsOutOfdate: state.project.outOfDate,
   isPending: state.project.isPending
});

const mapDispatchToProps = dispatch => bindActionCreators({
   saveNewProject: project_save_request,
   fetchProjects: project_request_all,
   fetchProgrammers: staff_request_all,
   goBack
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Project)

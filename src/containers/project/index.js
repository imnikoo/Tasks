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


class Project extends Component {
   
   constructor(props, context) {
      super(props, context);
      
      this.state = {
         name: '',
         client: '',
         projectType: '',
         income: '',
         team: [],
         availableProgrammers: [ ...props.programmers ]
      };
      
      this.handleInputChange = this.handleInputChange.bind(this);
      this.createNewProject = this.createNewProject.bind(this);
      this.handleProgrammerClick = this.handleProgrammerClick.bind(this);
   }
   
   componentDidMount() {
      this.props.fetchProjects();
      if (this.props.programmersListOutOfDate) {
         this.props.fetchProgrammers().then(() => {
            this.setState({
               availableProgrammers: [...this.props.programmers]
            });
         });
      }
   }
   
   createNewProject() {
      let newProject = Object.assign({}, this.state, {
         status: 'New',
         startedAt: new Date()
      });
      
      this.props.saveNewProject(newProject);
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
      return (
         <div className="project-container">
            
            <span className="project-title">Create project</span>
            
            <Form title="New project" handleAddClick={this.createNewProject} isPending={this.props.isPending}>
               <Input label={'Project name'} type="text" name="name" onChange={this.handleInputChange} value={this.state.name}/>
               <Input label={'Client'} type="text" name="client" onChange={this.handleInputChange} value={this.state.client}/>
   
               <select name="projectType" className={classnames({ 'form-select': true, selected: this.state.projectType })} value={this.state.projectType} onChange={this.handleInputChange}>
                  <option value="" disabled>Project type</option>
                  <option value="eCommerce">eCommerce</option>
                  <option value="Portal">Portal</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Soft">Soft</option>
               </select>
               
               <Input type="number" label={'Income'} name="income" onChange={this.handleInputChange} value={this.state.income}/>
            </Form>
            
            <ProgrammersList title="Selected programmers" programmers={this.state.team} handleClick={this.handleProgrammerClick}/>
            <ProgrammersList programmers={this.state.availableProgrammers} handleClick={this.handleProgrammerClick}/>
            
            <div className="project-actions card">
               <button className="button"><i className="material-icons">arrow_back</i>Back</button>
               <button className="button"><i className="material-icons">done</i>Create project</button>
            </div>
         
         </div>
      );
   }
}

const mapStateToProps = state => ({
   projects: state.project.projects,
   programmers: state.staff.programmers,
   programmersListOutOfDate: state.staff.outOfDate,
   isPending: state.project.isPending
});

const mapDispatchToProps = dispatch => bindActionCreators({
   saveNewProject: project_save_request,
   fetchProjects: project_request_all,
   fetchProgrammers: staff_request_all
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Project)

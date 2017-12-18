import React, {Component} from 'react';
import './styles.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Input from "../../components/Input/index";
import classnames from 'classnames';
import * as _ from 'lodash';
import Form from "../../components/Form/index";
import ProgrammersList from "../../components/ProgrammersList/index";
import {staff_request_all} from "../../actions/staff";
import {project_request_all, project_save_request} from "../../actions/project";
import moment from 'moment';
import q from 'q';
import {goBack, push} from "react-router-redux";

const EMPTY_TASK = {
   title: '',
   status: '',
   complexity: '',
   createdAt: '',
   plannedDeadline: '',
   programmer: '',
   programmerName: ''
};

class ProjectTasks extends Component {
   constructor(props) {
      super(props);
      this.state = {
         tasks: [],
         showProgrammersModal: false,
         task: EMPTY_TASK
      };
      
      this.handleInputChange = this.handleInputChange.bind(this);
      this.renderProgrammerChoosingModal = this.renderProgrammerChoosingModal.bind(this);
      this.handleProgrammerClick = this.handleProgrammerClick.bind(this);
      this.openProgrammerChoosingModal = this.openProgrammerChoosingModal.bind(this);
      this.saveCreateTask = this.saveCreateTask.bind(this);
      this.handleTaskClick = this.handleTaskClick.bind(this);
      this.handleClearClick = this.handleClearClick.bind(this);
   }
   
   componentDidMount() {
      let promises = [];
      if(this.props.programmersOutOfDate) {
         promises.push(this.props.fetchProgrammers());
      }
   
      if(this.props.projectsOutOfdate) {
         promises.push(this.props.fetchProjects());
      }
   
      q.all(promises).then(() => {
         let projectId = this.props.match.params.id;
         let project = _.find(this.props.projects, ['_id', projectId]);
         this.setState({ project });
      })
   }
   
   handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      
      if (name === 'complexity') {
         if (-(-value) < 1 || -(-value) > 5) {
            return;
         }
      }
      
      let task = Object.assign({ ...this.state.task }, {
         [name]: value
      });
      this.setState({
         task
      });
   }

   
   handleProgrammerClick(selectedProgrammer) {
      let task = Object.assign({}, this.state.task, {
         programmer: selectedProgrammer,
         programmerName: `${selectedProgrammer.firstName} ${selectedProgrammer.lastName}`
      });
      this.setState({
         showProgrammersModal: false,
         task
      })
   }

   saveCreateTask() {
      let task =  { ...this.state.task,
         createdAt: moment(this.state.task.createdAt).toISOString(),
         plannedDeadline: moment(this.state.task.plannedDeadline).toISOString()
      };
      let project = this.state.project;
      
      let newTasks;
      if (task._id) {
         newTasks = _.map(project.tasks, t => {
            if(t._id !== task._id) {
               return t;
            }
            return {
               ...t,
               ...task
            };
         });
      } else {
         newTasks = [ ...project.tasks, task ];
      }
      
      project.tasks = newTasks;
      this.props.saveProject(project).then(() => {
         let projectId = this.state.project._id;
         let project = _.find(this.props.projects, ['_id', projectId]);
         this.setState({ project, task: EMPTY_TASK });
      });
   }
   
   handleClearClick() {
      this.setState({
         task: EMPTY_TASK
      });
   }
   
   handleTaskClick(selectedTask) {
      this.setState({
         task: {
            ...selectedTask,
            programmerName: `${selectedTask.programmer.firstName} ${selectedTask.programmer.lastName}`
         }
      })
   }

   openProgrammerChoosingModal() {
      this.setState({
         showProgrammersModal: true
      })
   }
   
   
   renderProgrammerChoosingModal() {
      if(this.state.showProgrammersModal) {
         return <div className='modal-container'>
            <ProgrammersList title={'Choose programmer'} programmers={this.state.project.team} handleClick={this.handleProgrammerClick}/>
         </div>
      }
   }
   
   renderBackdrop() {
      if(this.state.showProgrammersModal) {
         return <div className='backdrop show'/>
      }
   }

   render() {
      if(!this.state.project) {
         return <div>..Loading..</div>
      }
      let formButtonTitle = this.state.task._id ? 'Save' : 'Add';
      return (
         <div className="project-tasks">
            <span className="manage-tasks-title">Manage your tasks</span>

            <div className="tasks-container card">
               <div className="tasks-header">
                  Tasks
               </div>
               <div className="tasks-list">
                  <div className="task-list-header">
                     <span className="task-title">Title</span>
                     <span className="task-status">Status</span>
                     <span className="task-complexity">Complexity</span>
                     <span className="task-created-at">Created at</span>
                     <span className="task-planned-at">Planned at</span>
                     <span className="task-programmer">Programmer</span>
                  </div>
                  {_.map(this.state.project.tasks, (task, key) =>
                     <div className="task" key={key} onClick={() => this.handleTaskClick(task) }>
                        <span className="task-title">{task.title}</span>
                        <span className="task-status">{task.status}</span>
                        <span className="task-complexity">{task.complexity}</span>
                        <span className="task-created-at">{moment(task.createdAt).format('DD-MM-YYYY')}</span>
                        <span className="task-planned-at">{moment(task.plannedDeadline).format('DD-MM-YYYY')}</span>
                        <span className="task-programmer">{task.programmer.firstName} {task.programmer.lastName}</span>
                     </div>
                  )}
               </div>
            </div>
   
            <Form title="New task" handleAddClick={this.saveCreateTask} isPending={this.props.isPending} buttonTitle={formButtonTitle} handleClearClick={this.handleClearClick}>
               <Input label={'Title'}  type="text" name="title"
                      onChange={this.handleInputChange} value={this.state.task.title}/>
   
               <select name="status" className={classnames({ 'form-select': true, selected: this.state.task.status })} value={this.state.task.status} onChange={this.handleInputChange}>
                  <option value="" disabled>Status</option>
                  <option value="New">New</option>
                  <option value="InProgress">In progress</option>
                  <option value="Completed">Completed</option>
               </select>
   
               <Input name="complexity" type="number"
                      label={'Complexity'} onChange={this.handleInputChange}
                      value={this.state.task.complexity}
               />
               <Input type="text" label={'Created at'} name="createdAt"
                      onChange={this.handleInputChange} value={this.state.task.createdAt}
                      onFocus={(e) => { e.target.type='date'; }}
                      onBlur={(e) => { e.target.type='text'; }}
               />
               <Input type="text" label={'Planned at'} name="plannedDeadline"
                      onChange={this.handleInputChange} value={this.state.task.plannedDeadline}
                      onFocus={(e) => { e.target.type='date'; }}
                      onBlur={(e) => { e.target.type='text'; }}
               />
              <Input label={'Programmer'} type="text" name="programmerName" value={this.state.task.programmerName} onClick={this.openProgrammerChoosingModal}/>
            </Form>
            
            <div className="staff-actions card">
               <button className="button" onClick={this.props.goBack}>
                  <i className="material-icons">arrow_back</i>
                  Back
               </button>
               <button className="button" onClick={() => this.props.goToProject(this.state.project._id)}>
                  <i className="material-icons">mode_edit</i>
                  Edit project
               </button>
            </div>

            {this.renderProgrammerChoosingModal()}
            {this.renderBackdrop()}
         </div>
      );
   }
}

const mapStateToProps = state => ({
   projects: state.project.projects,
   projectsOutOfdate: state.project.outOfDate,
   programmers: state.staff.programmers,
   programmersOutOfDate: state.staff.outOfDate
});

const mapDispatchToProps = dispatch => bindActionCreators({
   fetchProgrammers: staff_request_all,
   fetchProjects: project_request_all,
   saveProject: project_save_request,
   goBack,
   goToProject: projectId => push(`/project/${projectId}`)
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ProjectTasks)

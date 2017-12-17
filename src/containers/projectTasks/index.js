/**
 * Created by ASUS on 17/12/06.
 */
import React, {Component} from 'react';
import './styles.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Input from "../../components/Input/index";
import classnames from 'classnames';
import * as _ from 'lodash';
import Form from "../../components/Form/index";


class ProjectTasks extends Component {
   constructor(props) {
      super(props);
      this.state = { tasks: [], task: {
         title: '',
         status: '',
         complexity: '',
         createdAt: '',
         plannedDeadline: '',
         programmer: ''
      } };
      
      this.handleInputChange = this.handleInputChange.bind(this);
   }
   
   componentDidMount() {
      let projectId = this.props.match.params.id;
      let project = _.find(this.props.projects, ['_id', projectId]);
      this.setState({ ...project });
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
   
   render() {
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
                  {_.map(this.state.tasks, task =>
                     <div className="task" key={task._id}>
                        <span className="task-title">{task.title}</span>
                        <span className="task-status">{task.status}</span>
                        <span className="task-complexity">{task.complexity}</span>
                        <span className="task-created-at">{task.createdAt.substring(0, 10)}</span>
                        <span className="task-planned-at">{task.plannedDeadline.substring(0, 10)}</span>
                        <span className="task-programmer">{task.programmer.firstName} {task.programmer.lastName}</span>
                     </div>
                  )}
               </div>
            </div>
   
            <Form title="New task" handleAddClick={this.createNewTask} isPending={this.props.isPending}>
               <Input label={'Title'}  type="text" name="title"
                      onChange={this.handleInputChange} value={this.state.task.title}/>
   
               <select name="status" className={classnames({ 'form-select': true, selected: this.state.task.status })} value={this.state.task.status} onChange={this.handleInputChange}>
                  <option value="" disabled>Status</option>
                  <option value="New">New</option>
                  <option value="InProgress">In progress</option>
                  <option value="Finished">Finished</option>
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
              <Input label={'Programmer'} type="text" name="programmer"
                      onChange={this.handleInputChange} value={this.state.task.programmer}/>
            </Form>
            
            <div className="staff-actions card">
               <button className="button">
                  <i className="material-icons">arrow_back</i>
                  Back
               </button>
               <button className="button">
                  <i className="material-icons">save</i>
                  Save</button>
            </div>
         
         </div>
      );
   }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ProjectTasks)

import React, {Component} from 'react';
import './styles.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {project_request_all} from "../../actions/project";
import * as _ from 'lodash';
import {goBack, push} from "react-router-redux";
import Spinner from '../../components/Spinner';

class Projects extends Component {
   constructor(props, context) {
      super(props, context);
      
      this.goToProjectTasks = this.goToProjectTasks.bind(this);
   }
   
   componentDidMount() {
      this.props.fetchProjects();
   }
   
   goToProjectTasks(project) {
      this.props.goToProject(project._id);
   }
   
   render() {
      return (
         <div className="projects">
            <div className="projects-container card">
               <div className="projects-header">Projects</div>
               <div className="project-list-header">
                  <span className="project-name">Name</span>
                  <span className="project-client">Client</span>
                  <span className="project-type">Type</span>
                  <span className="project-status">Status</span>
                  <span className="project-started-at">Started at</span>
               </div>
               <div className="projects-list">
                  {_.map(this.props.projects, p =>
                     <div className="project" key={p._id} onClick={() => this.goToProjectTasks(p)}>
                        <span className="project-name">{p.name}</span>
                        <span className="project-client">{p.client}</span>
                        <span className="project-type">{p.projectType}</span>
                        <span className="project-status">{p.status}</span>
                        <span className="project-started-at">{p.startedAt.substring(0, 10)}</span>
                     </div>
                  )}
               </div>
               
               <div className="project-actions card">
                  <button className="button" onClick={this.props.goBack}>Back</button>
               </div>
               
               <Spinner isPending={this.props.isPending}/>
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => ({
   projects: state.project.projects,
   isPending: state.project.isPending
});

const mapDispatchToProps = dispatch => bindActionCreators({
   fetchProjects: project_request_all,
   goToProject: (projectId) => push(`/project/${projectId}/tasks`),
   goBack
   
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Projects)

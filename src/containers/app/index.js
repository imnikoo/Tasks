import React from "react";
import {Route} from "react-router-dom";
import Start from "../start";
import Staff from "../staff";
import Project from "../project";
import Projects from "../projects";
import ProjectTasks from "../projectTasks";
import "./styles.css";

const App = () => (
   <div className="components">
      <Route exact path="/" component={Start}/>
      <Route exact path="/staff" component={Staff}/>
      <Route exact path="/project" component={Project}/>
      <Route exact path="/projects" component={Projects}/>
      <Route exact path="/project/:id/tasks" component={ProjectTasks}/>
   </div>
);


export default App

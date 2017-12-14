import React from "react";
import {Route} from "react-router-dom";
import Start from "../start";
import Staff from "../staff";
import "./styles.css";

const App = () => (
   <div className="components">
      <Route exact path="/" component={Start}/>
      <Route exact path="/staff" component={Staff}/>
   </div>
);


export default App

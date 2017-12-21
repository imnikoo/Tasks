import React from "react";
import * as _ from 'lodash';
import './styles.css';

const ProgrammersList = (props) => {
   const handleClick = props.handleClick || _.noop;
   const title = props.title || 'Available programmers';
   return (
      <div className="all-programmers-container card">
         <span className="list-header">{title}</span>
         <div className="all-programmers-list">
            {_.map(props.programmers, (programmer, key) =>
               <div className="programmer" key={key} onClick={() => handleClick(programmer)}>
                  <i className="material-icons">person</i>
                  <span className="programmer-name">{programmer.firstName} {programmer.lastName}</span>
               </div>
            )}
         </div>
      </div>);
};

export default ProgrammersList;
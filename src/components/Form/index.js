import React, {Component} from 'react';
import Spinner from '../../components/Spinner';
import './styles.css';

class Form extends Component {
   constructor(props) {
      super(props);
   }
   
   render() {
      let { buttonTitle } = this.props;
      
      return (
         <div className={`form-add card`}>
               <span className="form-header" onClick={this.props.handleClearClick}>
                  {this.props.title}
                  <i className={`material-icons`}>clear</i>
               </span>
            <div className="form-inputs">
               {this.props.children}
            </div>
            <button className="button button-add" onClick={this.props.handleAddClick}>{buttonTitle}</button>
            <Spinner show={this.props.isPending}/>
         </div>
      );
   }
}

export default Form;
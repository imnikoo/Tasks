import React, {Component} from 'react';
import classnames from 'classnames';
import './styles.css';

class Input extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isValid: true,
         label: this.props.label
      }
   }
   validate = () => {
      let { validationRule, value } = this.props;
      if(!validationRule || !value) {
         this.setState({ isValid: true });
         return;
      }

      if(validationRule.pattern) {
         let isValid = validationRule.pattern.test(value);
         this.setState({
            isValid
         });
      }
   };

   render() {
      let {type, name, value, onChange, label, validationMessage} = this.props;
      return (<div className="input-group">
         <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={this.validate}
            className={classnames({ 'input-invalid': !this.state.isValid })}
            required
         />
         <span className="highlight"/>
         <span className="bar"/>
         <label>{this.state.isValid ? label : validationMessage}</label>
      </div>);
   }
}

export default Input;
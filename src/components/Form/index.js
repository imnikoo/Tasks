import React, {Component} from 'react';
import Spinner from '../../components/Spinner';
import './styles.css';

class Form extends Component {
   constructor(props) {
      super(props);

      this.state = {
         formLimited: true
      };

      this.toggleFormAddProgrammer = this.toggleFormAddProgrammer.bind(this);
   }

   componentDidMount() {
      this.toggleFormAddProgrammer();
   }


   toggleFormAddProgrammer = () => {
      let height = 50;
      let form = document.querySelectorAll('.form-add')[0];
      if (this.state.formLimited) {
         form.style['max-height'] = 'none';
         height = form.offsetHeight;
         form.style['max-height'] = '50px';
      }

      form.style['max-height'] = `${height}px`;

      this.setState((prevState) => {
         return {
            formLimited: !prevState.formLimited,
         }
      })
   };

   render() {
      let iconStateClass = this.state.formLimited ? 'icon-add--limited' : 'icon-add--full';

      return (
         <div className={`form-add card`}>
               <span className="form-header">
                  {this.props.title}
                  <i className={`material-icons ${iconStateClass}`} onClick={this.toggleFormAddProgrammer}>add</i>
               </span>
            <div className="form-inputs">
               {this.props.children}
            </div>
            <button className="button button-add" onClick={this.props.handleAddClick}>Add</button>
            <Spinner show={this.props.isPending}/>
         </div>
      );
   }
}

export default Form;
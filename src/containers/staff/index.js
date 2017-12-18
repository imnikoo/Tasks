import React, {Component} from 'react';
import './styles.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Input from "../../components/Input/index";
import classnames from 'classnames';
import * as _ from 'lodash';
import {staff_programmer_save_request, staff_request_all} from "../../actions/staff";
import {goBack, push} from "react-router-redux";
import ProgrammersList from "../../components/ProgrammersList/index";
import Form from "../../components/Form/index";

class Staff extends Component {
   constructor(props, context) {
      super(props, context);
      
      this.state = {
         firstName: '',
         lastName: '',
         formLimited: true
      };
      
      this.handleInputChange = this.handleInputChange.bind(this);
   }
   
   componentDidMount() {
      this.props.requestAll();
   };
   
   handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      
      this.setState({
         [name]: value
      });
   };
   
   handleCreateNewProgrammer = () => {
      let {firstName, lastName} = this.state;
      let newProgrammer = {firstName, lastName};
      this.props.saveProgrammer(newProgrammer)
         .then(() => {
            this.setState((prevState) => {
               return {
                  ...prevState,
                  firstName: '',
                  lastName: ''
               }
            })
         });
   };
   
   render() {
      return (
         <div className="staff">
            <span className="manage-staff-title">Manage your staff</span>
            <Form title="New programmer" handleAddClick={this.handleCreateNewProgrammer}
                  isPending={this.props.isPending}>
               <Input type="text" name="firstName" onChange={this.handleInputChange} value={this.state.firstName}
                      label={'First name'}/>
               <Input type="text" name="lastName" onChange={this.handleInputChange} value={this.state.lastName}
                      label={'Last name'}/>
            </Form>
            <ProgrammersList programmers={this.props.programmers}/>
            <div className="staff-actions card">
               <button className="button" onClick={this.props.goBack}>
                  <i className="material-icons">arrow_back</i>
                  Back
               </button>
               <button className="button" onClick={this.props.goToProjectPage}>
                  <i className="material-icons">work</i>
                  To projects
               </button>
            </div>
         
         </div>
      );
   }
}

const mapStateToProps = state => ({
   programmers: state.staff.programmers,
   isPending: state.staff.isPending
});

const mapDispatchToProps = dispatch => bindActionCreators({
   goBack,
   requestAll: staff_request_all,
   saveProgrammer: staff_programmer_save_request,
   goToProjectPage: () => push('/projects')
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Staff)

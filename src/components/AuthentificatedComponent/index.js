/**
 * Created by ASUS on 17/12/08.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {goBack, push} from "react-router-redux";

export default function requireAuthentication(Component) {
   
   class AuthenticatedComponent extends Component {
      
      componentWillMount() {
         this.checkAuth(this.props.token);
      }
      
      componentWillReceiveProps(nextProps) {
         this.checkAuth(nextProps.token);
      }
      
      checkAuth(token) {
         if (!token) {
            this.props.history.push('/');
         }
      }
      
      render() {
         return (
            <React.Fragment>
               {!!this.props.token === true
                  ? <Component {...this.props}/>
                  : null
               }
            </React.Fragment>
         )
         
      }
   }
   
   const mapStateToProps = (state) => ({
      token: state.auth.token
   });
   
   const mapDispatchToProps = dispatch => ({
      goBack,
      goOnMainPage: () => push('/')
   });
   
   return connect(
      mapStateToProps,
      mapDispatchToProps
   )(AuthenticatedComponent)
   
}
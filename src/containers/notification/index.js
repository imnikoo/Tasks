import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "./styles.css";
import * as classnames from "classnames";
import {CSSTransition} from "react-transition-group";

class Notification extends Component {
   render() {
      return (
         <SlideTop in={this.props.show}>
            <div className={classnames({
               notification: true,
               error: this.props.type === 'ERROR' && this.props.show,
               warning: this.props.type === 'WARNING' && this.props.show,
               info: this.props.type === 'INFO' && this.props.show,
            })}>{this.props.message}</div>
         </SlideTop>
      )
   }
}

const SlideTop = ({children, ...props}) => {
   return <CSSTransition
      {...props}
      timeout={1000}
      classNames="scale-top">
      {children}
   </CSSTransition>
};

const mapStateToProps = state => ({
   type: state.notification.type,
   message: state.notification.message,
   show: state.notification.show
});


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Notification);

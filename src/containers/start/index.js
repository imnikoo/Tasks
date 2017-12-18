import React, {Component} from "react";
import {goBack, push} from "react-router-redux";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "./styles.css";
import {CSSTransition} from "react-transition-group";

class Start extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    componentDidMount() {
        this.setState({show: true});
    }

    render() {
        return (
            <FadeIn in={this.state.show}>
                <div className="landing-container">
                    <div className="introduction">
                        <span className="app-name">
                           <span className="app-name__first-part"><span className="purple-text">P</span>roject</span>
                           <span className="app-name__second-part"><span className="purple-text">M</span>anaging</span>
                        </span>
                        <span className="app-description">
                           Welcome to the <span className="purple-text bold">Project managing</span>.
                           This application gives you a strong control of your brand new application.
                           To control your tasks and handle your time properly.
                        </span>
                    </div>
                   <div className="main-actions">
                      <button className="button main-actions__new-project" onClick={this.props.goToNewProjectPage}>New project</button>
                      <button className="button main-actions__current-projects" onClick={this.props.goToCurrentProjectsPage}>Current projects</button>
                      <button className="button main-actions__manage-staff" onClick={this.props.goToManageStaffPage}>Manage staff</button>
                   </div>
                </div>
            </FadeIn>)
    }
}

const FadeIn = ({children, ...props}) => {
    return <CSSTransition
        {...props}
        timeout={1000}
        classNames="fade-in">
        {children}
    </CSSTransition>
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    goBack,
    goToNewProjectPage: () => push('/project'),
    goToCurrentProjectsPage: () => push('/projects'),
    goToManageStaffPage: () => push('/staff')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Start)

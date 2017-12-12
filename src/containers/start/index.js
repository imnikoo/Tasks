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
                        <span className="introduction__app-name">Notes</span>
                        <span className="app-description">
               Welcome to the <span className="app-description__app-name">Notes</span>.
               This application helps you to stay on a short leg with your notes, information you need to save and use.
               You can create notes, change it, open whenever you want.
               <br/><span className="app-description__app-name">Notes</span> is Future.
            </span>
                    </div>
                    <div className="actions">
                        <div className="actions__sign-up" onClick={this.props.registrationPage}/>
                        <div className="actions__sign-in" onClick={this.props.logInPage}/>
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
    registrationPage: () => push('/registration'),
    logInPage: () => push('/login')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Start)

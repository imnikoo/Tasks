import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {note_select, notes_by_user_request} from "../../actions/note";
import "./styles.css";
import _ from "lodash";
import * as classnames from "classnames";
import Spinner from "../../components/Spinner/index";

class Workplace extends Component {
   constructor(props) {
      super(props);
   
      this.state = {};
   }
   
   componentDidMount() {
      if (!this.props.userId) {
         console.error('no user id');
      } else {
         if (this.props.isInvalidate) {
            this.props.fetchNotes(this.props.userId);
         }
      }
   }
   
   selectNote = (note) => {
      this.props.selectNote(note);
      let noteId = note._id || '';
      this.props.goToNote(noteId);
   };
   
   render() {
      return (
         <div className="workplace card">
            <div className="all-notes">
               <span className="all-notes__title">Notes</span>
               <div className="all-notes__container">
                  {_.map(this.props.notes, (note, key) => {
                     return (
                        <div key={key} onClick={() => this.selectNote(note)} className="all-notes__container__note">
                           <div className="all-notes__container__note--title">{note.title}</div>
                           <div className="all-notes__container__note--content">{note.content}</div>
                        </div>)
                  })}
               </div>
               <div className="all-notes__actions">
                  <button className="button all-notes__actions-new-note" onClick={() => {
                     this.selectNote({})
                  }}>New
                  </button>
               </div>
            </div>
            <div className={classnames({'backdrop': true, show: this.props.isPending})}>
               <Spinner />
            </div>
         </div>);
   }
}

const mapStateToProps = state => ({
   notes: state.note.notes,
   isInvalidate: state.note.isInvalidate,
   isPending: state.note.isPending,
   userId: state.auth.userId
});

const mapDispatchToProps = dispatch => bindActionCreators({
   fetchNotes: notes_by_user_request,
   selectNote: note_select,
   goToNote: (noteId) => push(`/note/${noteId}`),
   
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Workplace)

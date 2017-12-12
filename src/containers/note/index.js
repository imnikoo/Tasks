/**
 * Created by ASUS on 17/12/06.
 */
import React, {Component} from 'react';
import './styles.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {note_by_id_request, note_deselect, note_save_request} from "../../actions/note";
import {goBack} from "react-router-redux";
import * as classnames from "classnames";
import Spinner from "../../components/Spinner/index";

const DEFAULT_TITLE = 'Your note title';
const DEFAULT_CONTENT = 'Here goes content';

class Note extends Component {
   constructor(props, context) {
      super(props, context);
      
      this.state = {
         _id: props.note._id,
         title: props.note.title || DEFAULT_TITLE,
         content: props.note.content || DEFAULT_CONTENT
      }
   }
   
   componentDidMount() {
      let noteId = this.props.match.params.id;
      if (noteId && this.state.title === DEFAULT_TITLE && this.state.content === DEFAULT_CONTENT) {
         this.props.noteByIdRequest(noteId);
      }
   }
   
   
   saveNote = () => {
      let noteToSave = {
         id: this.state._id,
         title: this.state.title,
         content: this.state.content,
         userId: this.props.userId
      };
      this.props.noteSaveRequest(noteToSave);
   };
   
   discardChanges = () => {
      this.props.goBack();
      this.props.noteDeselect();
   };
   
   deleteNote = () => {
   };
   
   handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      
      this.setState({
         [name]: value
      });
   };
   
   render() {
      return (
         <div className="note card">
            <div className="note__title">
               <input
                  type="text"
                  name='title'
                  className="note__title--input"
                  value={this.state.title}
                  onChange={this.handleInputChange}
               />
            </div>
            <div className="note__content">
               <textarea
                  name='content'
                  className="note__content--textarea"
                  value={this.state.content}
                  onChange={this.handleInputChange} cols="30" rows="10">
               </textarea>
            </div>
            <div className="note-actions">
               <button className="button note-actions--save" onClick={this.saveNote}>Save</button>
               <button className="button note-actions--discard-changes" onClick={this.discardChanges}>Back</button>
               <button className="button note-actions--delete" onClick={this.deleteNote}>Delete</button>
            </div>
            <div className={classnames({ 'backdrop' : true, show: this.props.isPending })}>
               <Spinner />
            </div>
         </div>
      );
   }
}

Note.propTypes = {};
Note.defaultProps = {};

const mapStateToProps = state => ({
   note: state.note.selectedNote || {},
   userId: state.auth.userId,
   isPending: state.note.isPending
});

const mapDispatchToProps = dispatch => bindActionCreators({
   noteDeselect: note_deselect,
   noteSaveRequest: note_save_request,
   noteByIdRequest: note_by_id_request,
   goBack
   //delete
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Note)

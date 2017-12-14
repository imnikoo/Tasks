/**
 * Created by ASUS on 17/12/06.
 */
import React, {Component} from 'react';
import './styles.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Input from "../../components/Input/index";

class Staff extends Component {
   constructor(props, context) {
      super(props, context);
   }

   render() {
      return (
         <div className="staff">
            <span className="manage-staff-title">Manage your staff</span>

            <div className="form-add-programmer card">
               <span className="form-header">New programmer</span>
               <div className="form-inputs">
                  <Input label={'First name'}/>
                  <Input label={'Last name'}/>
               </div>
               <button className="button button-add-programmer">Add</button>
            </div>

            <div className="all-programmers-container card">
               <span className="list-header">Available programmers</span>
               <div className="all-programmers-list">
                  <div className="list-table-header">
                     <span className="programmer-index">#</span>
                     <span className="programmer-first-name">First name</span>
                     <span className="programmer-last-name">Last name</span>
                  </div>
                  <div className="programmer">
                     <span className="programmer-index">1</span>
                     <span className="programmer-first-name">Albal</span>
                     <span className="programmer-last-name">Kalamov</span>
                     <input className="programmer-check" name="isGoing" type="checkbox" />
                  </div>
                  <div className="programmer">
                     <span className="programmer-index">2</span>
                     <span className="programmer-first-name">Kalbas</span>
                     <span className="programmer-last-name">Namirov</span>
                     <input className="programmer-check" name="isGoing" type="checkbox" />
                  </div>
                  <div className="programmer">
                     <span className="programmer-index">3</span>
                     <span className="programmer-first-name">Akarak</span>
                     <span className="programmer-last-name">Muhambalov</span>
                     <input className="programmer-check" name="isGoing" type="checkbox" />
                  </div>
                  <div className="programmer">
                     <span className="programmer-index">4</span>
                     <span className="programmer-first-name">Gilgokomek</span>
                     <span className="programmer-last-name">Sobaka</span>
                     <input className="programmer-check" name="isGoing" type="checkbox" />
                  </div>
                  <div className="programmer">
                     <span className="programmer-index">5</span>
                     <span className="programmer-first-name">6yP9</span>
                     <span className="programmer-last-name">B CTaKaHE</span>
                     <input className="programmer-check" name="isGoing" type="checkbox" />
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Staff)

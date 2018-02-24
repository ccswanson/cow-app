import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Cows } from '../api/cows.js';
import { Calves } from '../api/cows.js';


class AddCalfModal extends React.Component {
  handleAdd(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const calfDOB = ReactDOM.findDOMNode(this.refs.calfDOB).value.trim();
    const calfSex = ReactDOM.findDOMNode(this.refs.calfSex).value.trim();
    const location = ReactDOM.findDOMNode(this.refs.location).value.trim();
    const preCondWeight = ReactDOM.findDOMNode(this.refs.preCondWeight).value.trim();
    const heavyLight = ReactDOM.findDOMNode(this.refs.heavyLight).value.trim();
    const calfYear = calfDOB.slice(0,4)

    let alreadyExists = false
    if(this.props.cow.calf){
      const yearArray = this.props.cow.calf.map(calf=>calf.calfYear)
      yearArray.map(year=>{
        if(year == calfYear){
          return(alreadyExists = true)
        }
      });
    }

    if(alreadyExists == false){
      Cows.update(
        this.props.cow._id, {
          $addToSet: {
            calf: this.props.cow._id+'-'+calfYear
          }
        });
      Calves.insert({
          _id: this.props.cow._id+'-'+calfYear,
          calfYear,
          calfDOB,
          calfSex,
          location,
          preCondWeight,
          heavyLight,
          createdAt: new Date(), // current time
        });
    }else{
      alert("Calf Already Exists");
    }

      document.getElementById('closeButtonAdd').click();
      // Clear form
      // ReactDOM.findDOMNode(this.refs.textColor.value = '';
      // ReactDOM.findDOMNode(this.refs.textNumber.value = '';
      // ReactDOM.findDOMNode(this.refs.textYear.value = '';
    }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    return (<div className="backdrop" style={backdropStyle}>
      <div className="modal w3-display-container" style={modalStyle}>
        {this.props.children}

        <form className="new-cow">
          <input
            className="form-input w3-input"
            type="date"
            ref="calfDOB"
          />
          <select className="form-input w3-input" ref="calfSex">
            <option value="Heifer">Heifer</option>
            <option value="Steer">Steer</option>
          </select>
          <input
            className="form-input w3-input"
            type="text"
            ref="location"
            placeholder="Location"
          />
          <input
            className="form-input w3-input"
            type="text"
            ref="preCondWeight"
            placeholder="Preconditioning Weight"
          />
          <select className="form-input w3-input" ref="heavyLight">
            <option value="-">-</option>
            <option value="H">H</option>
            <option value="L">L</option>
            <option value="S">S</option>
          </select>
          <button className="w3-button w3-green w3-display-bottomleft" onClick={this.handleAdd.bind(this)} type="button">Add</button>

          <button id="closeButtonAdd" onClick={this.props.onClose} className="w3-button w3-red w3-display-bottomright" type="button">
              Close
          </button>
        </form>
      </div>
    </div>);
  }
}

AddCalfModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default AddCalfModal;

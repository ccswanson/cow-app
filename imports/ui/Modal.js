import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Cows } from '../api/cows.js';

class Modal extends React.Component {
  handleAddCow(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const number = ReactDOM.findDOMNode(this.refs.textNumber).value.trim();
    const color = ReactDOM.findDOMNode(this.refs.textColor).value.trim();
    const birthYear = ReactDOM.findDOMNode(this.refs.textYear).value.trim();
    const origin = ReactDOM.findDOMNode(this.refs.origin).value.trim();

    if(color && number){
      Cows.insert({
        color,
        number,
        birthYear,
        origin,
        createdAt: new Date(), // current time
      });
      document.getElementById('closeButton').click();
      // Clear form
      // ReactDOM.findDOMNode(this.refs.textColor.value = '';
      // ReactDOM.findDOMNode(this.refs.textNumber.value = '';
      // ReactDOM.findDOMNode(this.refs.textYear.value = '';
    }
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
            type="text"
            ref="textColor"
            placeholder="Color"
          />
          <input
            className="form-input w3-input"
            type="text"
            ref="textNumber"
            placeholder="Number"
          />
          <input
            className="form-input w3-input"
            type="text"
            ref="textYear"
            placeholder="Birth Year"
          />
          <input
            className="form-input w3-input"
            type="text"
            ref="origin"
            placeholder="Origin"
          />
          <button className="w3-button w3-green w3-display-bottomleft" type="button" onClick={this.handleAddCow.bind(this)}>Add</button>

          <button id="closeButton" onClick={this.props.onClose} className="w3-button w3-red w3-display-bottomright" type="button">
              Close
          </button>
        </form>
      </div>
    </div>);
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'

import { Cows } from '../api/cows.js';
import { CurrentYear } from '../api/cows.js';

import Cow from './Cow.js';
import AddCowModal from './AddCowModal';
import ViewModal from './ViewModal';

// App component - represents the whole app
class App extends Component {
  //Modal
  constructor(props) {
    super(props);
    this.state = { isOpen: false};
    Session.set('currentYear', '2018')
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  setCurrentYear(event){
    const current = ReactDOM.findDOMNode(this.refs.currentyear).value.trim();
    Session.set('currentYear', current)

  }
  renderCows() {
    return this.props.cows.map((cow) => (
      <Cow key={cow._id} cow={cow} />
    ));
  }

  render() {
    return (
      <div className="wrapper">
        <div className="title-bar">
          <h1>Cows</h1>
            <button className="w3-button w3-green" onClick={this.toggleModal.bind(this)} type="button">
              Add Cow
            </button>
            <p>Current Year</p>
            <select className="form-input w3-input" ref="currentyear" onChange={this.setCurrentYear.bind(this)}>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>

            <AddCowModal show={this.state.isOpen}
              onClose={this.toggleModal}>
              Add a New cow
            </AddCowModal>
        </div>

          <div className="w3-container the-cows">
              {this.renderCows()}
          </div>
      </div>
    );
  }
}


export default withTracker(() => {
  return {
    cows: Cows.find({}).fetch(),
  };
})(App);

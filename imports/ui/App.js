import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Cows } from '../api/cows.js';
import { Calves } from '../api/cows.js';

import Cow from './Cow.js';
import Modal from './Modal';
import ViewModal from './ViewModal';

// App component - represents the whole app
class App extends Component {
  //Modal
  constructor(props) {
    super(props);
    this.state = { isOpen: false};
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
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

            <Modal show={this.state.isOpen}
              onClose={this.toggleModal}>
              Add a New cow
            </Modal>
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
    calves: Calves.find({}).fetch(),
  };
})(App);

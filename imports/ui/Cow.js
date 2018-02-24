import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import ViewModal from './ViewModal';
import tagColor from './TagColor';

export default class Cow extends Component {
  //Modal
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleViewModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
        <div className="w3-card-2 cow-cards" style={tagColor(this.props.cow.color)}>
          <div className="cow-cards-title">{this.props.cow.number}-{this.props.cow.color}</div>
          <div>Birth Year -- {this.props.cow.birthYear}</div>
          <div>Origin -- {this.props.cow.origin}</div>
          <button className="w3-button w3-gray" onClick={this.toggleViewModal.bind(this)} type="button">
            View
          </button>
          <ViewModal {...this.props} show={this.state.isOpen}
            onClose={this.toggleViewModal}>
          </ViewModal>
        </div>
    );
  }
}

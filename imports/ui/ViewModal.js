import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import AddCalfModal from './AddCalfModal';
import EditCalfModal from './EditCalfModal';

import { Calves } from '../api/cows.js';

class ViewModal extends React.Component {
  //Modal
  constructor(props) {
    super(props);

    this.state = { isOpen: false,
                  isOpenView: false,
                  isOpenEdit: false,
                  };
  }

  toggleAddCalfModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleEditCalfModal = () => {
    this.setState({
      isOpen: !this.state.isOpenEdit
    });
  }
  toggleViewCalfModal = () => {
    this.setState({
      isOpenView: !this.state.isOpenView,
    });
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
      padding: 30,
    };

    const currentCalf = ()=>{
      const currentCalfYear = Session.get('currentYear');
      const currentCalf = this.props.cow.calf;
      const Calf = this.props.calves.map(calf=>{
          if(calf.calfYear == currentCalfYear && calf._id == currentCalf){
             return(<div key="Calves">
                      <div key={calf.calfDOB}>Date of Birth --    {calf.calfDOB}</div>
                      <div key="Sex">Sex --     {calf.calfSex}</div>
                      <div key="location">{calf.calfYear} Location --     {calf.location}</div>
                      <div key="preCondWeight">Preconditioning Weight --    {calf.preCondWeight}</div>
                      <div key="HorL">Heavy or Light --     {calf.heavyLight}</div>
                      <button className="w3-button w3-orange w3-display-bottomcenter" onClick={this.toggleEditCalfModal.bind(this)} type="button">
                        Edit Calf
                      </button>
                      <EditCalfModal {...this.props} show={this.state.isOpenEdit}
                        onClose={this.toggleEditCalfModal}>
                      </EditCalfModal>
                    </div>)
          }
      });
      return(Calf)
    }

    return (<div className="backdrop" style={backdropStyle}>
      <div className="modal w3-display-container" style={modalStyle}>
        {this.props.children}
        <div className="cow-cards-title">{this.props.cow.number}-{this.props.cow.color}</div>
        <div>Birth Year -- {this.props.cow.birthYear}</div>
        <div>Origin -- {this.props.cow.origin}</div>
        <div className="calf-cards-title">Calves</div>
        {this.props.cow.calf ? currentCalf(this) :null}
        <button className="w3-button w3-green w3-display-bottomleft" onClick={this.toggleAddCalfModal} type="button">
          Add Calf
        </button>
        <button id="closeButton" onClick={this.props.onClose} className="w3-button w3-red w3-display-bottomright" type="button">
          Close
        </button>
        <AddCalfModal {...this.props} show={this.state.isOpen}
          onClose={this.toggleAddCalfModal}>
        </AddCalfModal>
      </div>
    </div>);
  }
}

ViewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default withTracker(() => {
  return {
    calves: Calves.find({}).fetch(),
  };
})(ViewModal);

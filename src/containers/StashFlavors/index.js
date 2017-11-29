import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Divider from 'material-ui/Divider';
import FlavorTable from './FlavorTable';
import AddFlavorForm from './AddFlavorForm';

import { addFlavor } from './actions';

class StashFlavors extends Component {
  render() {
    const {  handleFlavorSubmit } = this.props;

    return (
      <div>
        <AddFlavorForm onFlavourSubmit={handleFlavorSubmit} />

        <Divider/>

        <FlavorTable />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleFlavorSubmit: data => dispatch(addFlavor(data))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(StashFlavors);

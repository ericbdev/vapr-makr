import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';

import AppPage from '../../components/AppPage/index';
import FlavorTable from './FlavorTable';
import AddFlavorForm from './AddFlavorForm';

import { addFlavor } from './actions';

class StashFlavors extends Component {
  render() {
    const {  handleFlavorSubmit } = this.props;

    return (
      <AppPage>
        <Grid item xs={12}>
          <AddFlavorForm onFlavourSubmit={handleFlavorSubmit} />

          <Divider/>

          <FlavorTable />
        </Grid>
      </AppPage>
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

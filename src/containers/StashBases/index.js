import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import AppPage from '../../components/AppPage/index';

class StashBases extends Component {

  render() {
    return (
      <AppPage>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          StashBases
        </Grid>
      </AppPage>
    );
  }
}

export default StashBases;

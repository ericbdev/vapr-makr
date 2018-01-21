import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import AppPage from '../../components/AppPage/index';

class StashJuices extends Component {
  render() {
    return (
      <AppPage>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          StashJuices
        </Grid>
      </AppPage>
    );
  }
}

export default StashJuices;

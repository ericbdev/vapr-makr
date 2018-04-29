import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import AppPage from '../../components/AppPage/index';

class Home extends Component {

  render() {
    return (

      <AppPage>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          Home
        </Grid>
      </AppPage>
    );
  }
}

export default Home;

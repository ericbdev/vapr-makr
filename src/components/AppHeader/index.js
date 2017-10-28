import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import { Menu as IconMenu } from 'material-ui-icons';

import { appConfig } from '../../config/index';

import AppDrawer from './AppDrawer';

class AppHeader extends Component {
  state = {
    drawerOpened: false,
    stashOpen: false,
  };

  handleDrawerChange = (drawerOpened) => {
    this.setState({ drawerOpened });
  };

  render() {
    const props = this.props;

    return (
      <div>
        <AppDrawer
          drawerOpened={this.state.drawerOpened}
          handleDrawerChange={this.handleDrawerChange}
          {...props}
        />

        <AppBar>
          <Grid container justify="flex-start" alignItems="center">
            <Grid item xs={2}>
              <IconButton
                onClick={() => this.handleDrawerChange(true)}
                onKeyDown={() => this.handleDrawerChange(true)}
              >
                <IconMenu />
              </IconButton>
            </Grid>

            <Grid item xs={10}>
              <span>
                {appConfig.appName}
              </span>
            </Grid>
          </Grid>
        </AppBar>
      </div>
    )
  }
}

export default AppHeader;



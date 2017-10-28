import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
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
          <Toolbar disableGutters>
            <IconButton
              onClick={() => this.handleDrawerChange(true)}
              onKeyDown={() => this.handleDrawerChange(true)}
              color="inherit"
            >
              <IconMenu />
            </IconButton>
            <Typography type="title" color="inherit">
              {appConfig.appName}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default AppHeader;



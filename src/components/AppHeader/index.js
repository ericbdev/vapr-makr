import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { Menu as IconMenu } from 'material-ui-icons';

import { appConfig } from '../../config/index';

import AppDrawer from './AppDrawer';

class AppHeader extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  state = {
    drawerOpened: false,
    stashOpen: false,
  };

  handleDrawerChange = (drawerOpened) => {
    this.setState({ drawerOpened });
  };

  handleNavClick = (path) => {
    this.props.history.push(path);
    this.handleDrawerChange(false);
  };

  render() {
    const props = this.props;

    return (
      <div>
        <AppDrawer
          drawerOpened={this.state.drawerOpened}
          handleDrawerChange={this.handleDrawerChange}
          handleNavClick={this.handleNavClick}
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

export default withRouter(AppHeader);



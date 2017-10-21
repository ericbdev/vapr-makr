import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';

import { appConfig } from '../../config/index';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: props.drawerOpened,
    };
  }

  toggleDrawer = () => {
    this.setState({drawerOpened: !this.state.drawerOpened});
  };

  render() {
    return (
      <div>
        <AppBar>
          <span>{appConfig.appName}</span>
        </AppBar>
      </div>
    )
  }
}

AppHeader.propTypes = {
  drawerOpened: PropTypes.bool,
};

AppHeader.defaultProps = {
  drawerOpened: false,
};

export default AppHeader;



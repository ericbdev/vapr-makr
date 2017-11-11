import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { matchPath, withRouter } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import { Close as IconClose } from 'material-ui-icons';

import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import NavListItem from './NavListItem';

import { routes } from '../../config/index';

const styles = {
  appDrawer: {
    width: 250,
  },
};

class AppDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    drawerOpened: PropTypes.bool,
    handleDrawerChange: PropTypes.func.isRequired,
    handleNavClick: PropTypes.func.isRequired,
  };

  state = {
    stashOpen: false,
  };

  toggleStashMenu = (stashOpen) => {
    this.setState({ stashOpen });
  };

  isActive(path) {
    const currentPath = this.props.location.pathname;
    const matchInfo = matchPath(path, currentPath);

    return matchInfo ? matchInfo.isExact : false;
  }

  render() {
    const { classes, handleDrawerChange, handleNavClick, drawerOpened } = this.props;

    return (
      <Drawer open={drawerOpened}
        onRequestClose={() => handleDrawerChange(false)}>
        <div className={classes.appDrawer}>
          <Grid container>
            <Grid item xs={12}>
              <IconButton onClick={() => handleDrawerChange(false)}
                onKeyDown={() => handleDrawerChange(false)}>
                <IconClose />
              </IconButton>
            </Grid>
          </Grid>

          <Divider default/>

          <List component="div">
            <NavListItem
              route={routes.home}
              handleClick={handleNavClick}
              isActive={this.isActive(routes.home.path)}
            />
            <NavListItem 
              route={routes.recipes}
              handleClick={handleNavClick}
              isActive={this.isActive(routes.recipes.path)}
            />
            <NavListItem 
              route={routes.calculator}
              handleClick={handleNavClick}
              isActive={this.isActive(routes.calculator.path)}
            /> 
            <NavListItem
              handleClick={() => this.toggleStashMenu(!this.state.stashOpen)}
              isActive={this.state.stashOpen}
            >
              <span>{routes.stash.title}</span>
              {this.state.stashOpen ? <ExpandLess /> : <ExpandMore />}
            </NavListItem>
            <Collapse
              in={this.state.stashOpen}
              timeout="auto"
              unmountOnExit>
              <NavListItem
                route={routes.stash.children.flavours}
                handleClick={handleNavClick}
                isActive={this.isActive(routes.stash.children.flavours.path)}
                subnav={true}
              />
              <NavListItem
                route={routes.stash.children.bases}
                handleClick={handleNavClick}
                isActive={this.isActive(routes.stash.children.bases.path)}
                subnav={true}
              />
              <NavListItem
                route={routes.stash.children.juices}
                handleClick={handleNavClick}
                isActive={this.isActive(routes.stash.children.juices.path)}
                subnav={true}
              />
            </Collapse>
          </List>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(withRouter(AppDrawer));

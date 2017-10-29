import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
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
            <NavListItem route={routes.home} handleNavClick={handleNavClick}/>
            <NavListItem route={routes.recipes}
              handleNavClick={handleNavClick}/>
            <NavListItem route={routes.calculator}
              handleNavClick={handleNavClick}/>
            <ListItem button
              onClick={() => this.toggleStashMenu(!this.state.stashOpen)}>
              <ListItemText primary={routes.stash.title}/>
              {this.state.stashOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.stashOpen}
              transitionDuration="auto"
              unmountOnExit>
              <NavListItem route={routes.stash.children.flavours}
                handleNavClick={handleNavClick}/>
              <NavListItem route={routes.stash.children.bases}
                handleNavClick={handleNavClick}/>
              <NavListItem route={routes.stash.children.juices}
                handleNavClick={handleNavClick}/>
            </Collapse>
          </List>
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(AppDrawer);
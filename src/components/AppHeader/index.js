import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Collapse from 'material-ui/transitions/Collapse';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import { Close as IconClose, Menu as IconMenu } from 'material-ui-icons';

import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import { appConfig, routes } from '../../config/index';

import NavListItem from './NavListItem';

class AppHeader extends Component {
  state = {
    drawerOpened: false,
    stashOpen: false,
  };

  toggleStashMenu = (stashOpen) => {
    this.setState({ stashOpen });
  };

  toggleDrawer = (drawerOpened) => {
    this.setState({ drawerOpened });
  };

  render() {
    const props = this.props;
    const {drawerOpened} = this.state;

    return (
      <div>
        <Drawer
          open={drawerOpened}
          onRequestClose={() => this.toggleDrawer(false)}
        >
          <Grid container>
            <Grid item xs={12}>

              <IconButton
                onClick={() => this.toggleDrawer(false)}
                onKeyDown={() => this.toggleDrawer(false)}
              >
                <IconClose />
              </IconButton>
            </Grid>
          </Grid>

          <Divider default/>

          <List component="div">
            <NavListItem route={routes.home} {...props} />
            <NavListItem route={routes.recipes} {...props} />
            <NavListItem route={routes.calculator} {...props} />
            <ListItem button onClick={() => this.toggleStashMenu(!this.state.stashOpen)}>
              <ListItemText primary={routes.stash.title} />
              {this.state.stashOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.stashOpen} transitionDuration="auto" unmountOnExit>
              <NavListItem route={routes.stash.children.flavours} {...props} />
              <NavListItem route={routes.stash.children.bases} {...props} />
              <NavListItem route={routes.stash.children.juices} {...props} />
            </Collapse>
          </List>
        </Drawer>

        <AppBar>
          <Grid container justify="flex-start" alignItems="center">
            <Grid item xs={2}>
              <IconButton
                onClick={() => this.toggleDrawer(true)}
                onKeyDown={() => this.toggleDrawer(true)}
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



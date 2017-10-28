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
  }
};

class AppDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    drawerOpened: PropTypes.bool,
    handleDrawerChange: PropTypes.func,
  };

  state = {
    stashOpen: false,
  };

  toggleStashMenu = (stashOpen) => {
    this.setState({ stashOpen });
  };

  render() {
    const props = this.props;

    return (
      <Drawer
        open={props.drawerOpened}
        onRequestClose={() => props.handleDrawerChange(false)}
      >
        <div className={props.classes.appDrawer}>
          <Grid container>
            <Grid item xs={12}>

              <IconButton
                onClick={() => props.handleDrawerChange(false)}
                onKeyDown={() => props.handleDrawerChange(false)}
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
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(AppDrawer);
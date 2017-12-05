import React, { Component } from 'react';
import { matchPath, withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import List, { ListSubheader } from 'material-ui/List';
import { Close as IconClose } from 'material-ui-icons';

import NavListItem from './NavListItem';
import { routes, themeStyles } from '../../config/index';

const appDrawerStyles = theme => ({
  appDrawer: {
    width: themeStyles.layout.appDrawer.width,
  },
});

class AppDrawer extends Component {
  isActive(path) {
    const currentPath = this.props.location.pathname;
    const matchInfo = matchPath(path, currentPath);

    return matchInfo ? matchInfo.isExact : false;
  }

  render() {
    const { classes, handleDrawerChange, handleNavClick, drawerOpened } = this.props;

    return (
      <Drawer 
        open={drawerOpened}
        onRequestClose={() => handleDrawerChange(false)}
      >
        <div className={classes.appDrawer}>
          <Grid>
            <Grid item xs={12}>
              <IconButton
                onClick={() => handleDrawerChange(false)}
                onKeyUp={(event) => handleDrawerChange(false, event)}
              >
                <IconClose />
              </IconButton>
            </Grid>
          </Grid>

          <Divider default/>

          <List>
            <NavListItem
              route={routes.home}
              handleClick={handleNavClick}
              isActive={this.isActive(routes.home.path)}
              isChild={false}
            />
          </List>

          <Divider />

          <List>
            <ListSubheader component="li">
              {routes.recipes.title}
            </ListSubheader>

            <NavListItem 
              route={routes.recipes.children.add}
              handleClick={handleNavClick}
              isActive={this.isActive(routes.recipes.children.add.path)}
              isChild={true}
            />

            <NavListItem 
              route={routes.recipes.children.all}
              handleClick={handleNavClick}
              isActive={this.isActive(routes.recipes.children.all.path)}
              isChild={true}
            />
          </List>

          <Divider />

          <List>
            <ListSubheader>
              {routes.stash.title}
            </ListSubheader>

            <NavListItem
              route={routes.stash.children.flavors}
              handleClick={handleNavClick}
              isActive={this.isActive(routes.stash.children.flavors.path)}
              isChild={true}
            />
            <NavListItem
              route={routes.stash.children.bases}
              handleClick={handleNavClick}
              isActive={this.isActive(routes.stash.children.bases.path)}
              isChild={true}
            />
            <NavListItem
              route={routes.stash.children.juices}
              handleClick={handleNavClick}
              isActive={this.isActive(routes.stash.children.juices.path)}
              isChild={true}
            />
          </List>
        </div>
      </Drawer>
    );
  }
}

export default withRouter(withStyles(appDrawerStyles)(AppDrawer));

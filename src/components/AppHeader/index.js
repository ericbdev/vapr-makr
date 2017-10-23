import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { MenuList, MenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import {Close as IconClose, Menu as IconMenu} from 'material-ui-icons';

import { appConfig, routes } from '../../config/index';

class AppHeader extends React.Component {
  state = {
    drawerOpened: false
  };

  toggleDrawer = (drawerOpened) => {
    this.setState({ drawerOpened });
  };

  render() {
    const {drawerOpened} = this.state;

    return (
      <div>
        <Drawer
          open={drawerOpened}
          onRequestClose={() => this.toggleDrawer(false)}
        >
          <Grid container>
            <Grid item xs={1}>

              <IconButton
                onClick={() => this.toggleDrawer(false)}
                onKeyDown={() => this.toggleDrawer(false)}
              >
                <IconClose />
              </IconButton>
            </Grid>
          </Grid>

          <Divider default/>

          <MenuList>
          {
            routes.map(route => (
                <MenuItem key={route.id}>
                  <Button
                    component={Link}
                    to={{pathname: route.path}}
                  >
                  {route.title}
                  </Button>
                </MenuItem>
              ),
            )
          }
          </MenuList>
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

            <Grid item xs={8}>
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



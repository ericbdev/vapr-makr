import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { common as commonColors } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { ListItem } from 'material-ui/List';

//TODO: Map spacings/sizings
const styles = theme => ({
  navButton: theme.mixins.gutters({
    justifyContent: 'flex-start',
    width: '100%',
    color: commonColors.lightBlack,
    fontSize: '18px',
    textTransform: 'none',
    borderRadius: 0,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      textDecoration: 'none',
    },
  }),
  activeButton: {
    color: commonColors.darkBlack,
  },
  navItem: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  subNavItem: {
    paddingLeft: '14px',
  },
  navLink: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
});

class NavListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    route: PropTypes.object,
    subnav: PropTypes.bool,
  };

  render() {
    const { 
      children, 
      classes, 
      handleClick, 
      isActive,
      route,
      subnav
    } = this.props;

    const navClass = subnav
      ? classNames(classes.navItem, classes.subNavItem)
      : classes.navItem;
    const buttonClass = isActive
      ? classNames(classes.navButton, classes.activeButton)
      : classes.navButton;

    if (route) {
      const { title, path } = route;

      return (
        <ListItem
          className={navClass}
          disableGutters
          onClick={() => handleClick(path)}
        >
          <Button
            variant="button"
            disableRipple
            className={buttonClass}
          >
            {title}
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem
        className={navClass}
        disableGutters
        onClick={handleClick}
      >
        <Button
          variant="button"
          disableRipple
          className={buttonClass}
        >
          {children}
        </Button>
      </ListItem>
    );
  }
}

export default withStyles(styles)(NavListItem);

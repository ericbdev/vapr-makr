import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { ListItem } from 'material-ui/List';

import { themeStyles } from '../../config/index';

//TODO: Map spacings/sizings
const styles = theme => ({
  navButton: theme.mixins.gutters({
    justifyContent: 'flex-start',
    width: '100%',
    color: themeStyles.colors.lightBlack,
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
    color: themeStyles.colors.darkBlack,
  },
  subNavButtonText: {
    paddingLeft: '14px',
  },
  navItem: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
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

    const buttonClass = isActive
      ? classNames(classes.navButton, classes.activeButton)
      : classes.navButton;

    const buttonTextClass = subnav ? classes.subNavButtonText: null ;

    if (route) {
      const { title, path } = route;

      return (
        <ListItem
          className={classes.navItem}
          disableGutters
          onClick={() => handleClick(path)}
        >
          <Button
            variant="button"
            disableRipple
            className={buttonClass}
          >
            <span
              className={buttonTextClass}
            >
              {title}
            </span>
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem
        className={classes.navItem}
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

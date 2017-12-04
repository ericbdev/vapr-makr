import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "material-ui/styles";
import { ListItem, ListItemText } from "material-ui/List";

import { themeStyles } from "../../config/index";

//TODO: Map spacings/sizings
const styles = theme => ({
  navItem: {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
      backgroundColor: theme.palette.text.lightDivider,
    }
  },
  navButton: {
    justifyContent: 'flex-start',
    width: '100%',
    color: themeStyles.colors.lightBlack,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(theme.typography.fontSize),
    textTransform: 'none',
    borderRadius: 0,
    "&:hover": {
      textDecoration: 'none',
    },
  },
  activeButton: {
    color: themeStyles.colors.darkBlack,
  },
  childButton: {
    paddingLeft: '14px',
  }
});

class NavListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    route: PropTypes.object,
    isChild: PropTypes.bool,
  };

  render() {
    const { classes, handleClick, isChild, isActive, route } = this.props;

    let buttonClass = classes.navButton;

    if (isActive) {
      buttonClass = classNames(buttonClass, classes.activeButton);
    }

    if (isChild) {
      buttonClass = classNames(buttonClass, classes.childButton);
    }

    const { title, path } = route;
    const primary = <span className={buttonClass}>{title}</span>;

    return (
      <ListItem
        button
        disableRipple
        className={classes.navItem}
        onClick={() => handleClick(path)}
      >
        <ListItemText
          primary={primary}
          disableTypography={true}
          inset={false}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles)(NavListItem);

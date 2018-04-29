import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Notification from '../Notification';

const styles = theme => ({
  root: {
    marginTop: 56,
    padding: [theme.spacing.unit * 4, theme.spacing.unit * 2],
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      marginTop: 48,
    },
    [theme.breakpoints.up('sm')]: {
      padding: [theme.spacing.unit * 6, theme.spacing.unit * 4],
      marginTop: 64,
    },
  },
  single: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 'auto',
    maxWidth: 1060,
  },
  lgDouble: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 'auto',
    maxWidth: 800,
    [theme.breakpoints.up('lg')]: {
      maxWidth: '100%',
    },
  }
});

class AppPage extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object,
    layoutType: PropTypes.oneOf([
      'single',
      'lg-double'
    ]),
  };

  containerClass(layoutType) {
    let containerClass = 'single';

    if (layoutType === 'lg-double') {
      containerClass = 'lgDouble';
    }

    return this.props.classes[containerClass];
  }

  render() {
    const { children, classes, layoutType } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <Grid
            container
            className={this.containerClass(layoutType)}
          >
            {children}
          </Grid>
        </div>

        <Notification />
      </div>
    );
  }
}

export default withStyles(styles)(AppPage);

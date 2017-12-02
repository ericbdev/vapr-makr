import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
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
  pageContent: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 'auto',
    maxWidth: 1060,
  }
});

class AppPage extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object,
  };

  render() {
    const { children, classes } = this.props;

    return (
      <Paper className={classes.root}>
        <div className={classes.pageContent}>
          {children}
        </div>

        <Notification />
      </Paper>
    );
  }
}

export default withStyles(styles)(AppPage);

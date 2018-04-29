import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  root: {
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'block',
  }
});

class Loading extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  render() {
    const { classes } = this.props;

    return (
      <CircularProgress className={classes.root} />
    );
  }
}

export default withStyles(styles)(Loading);

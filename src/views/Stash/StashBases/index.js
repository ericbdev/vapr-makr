import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class StashBases extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <span className="todo">StashBases</span>
      </div>
    );
  }
}

StashBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StashBases);
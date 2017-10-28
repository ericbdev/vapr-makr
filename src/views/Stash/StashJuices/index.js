import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class StashJuices extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <span className="todo">StashJuices</span>
      </div>
    );
  }
}

StashJuices.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StashJuices);
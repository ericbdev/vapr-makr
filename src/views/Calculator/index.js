import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class Caclulator extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <span className="todo">Caclulator</span>
      </div>
    );
  }
}

Caclulator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Caclulator);
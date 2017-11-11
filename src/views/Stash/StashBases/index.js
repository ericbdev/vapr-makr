import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
});

class StashBases extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <span className="todo">StashBases</span>
      </div>
    );
  }
}

export default withStyles(styles)(StashBases);
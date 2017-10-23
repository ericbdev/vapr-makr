import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class Home extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <span className="todo">Home</span>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
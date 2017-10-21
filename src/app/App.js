import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import withRoot from './withRoot';

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class App extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <span className="todo">TODO</span>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
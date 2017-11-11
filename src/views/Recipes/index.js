import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
});

class Recipes extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <span className="todo">Recipes</span>
      </div>
    );
  }
}

export default withStyles(styles)(Recipes);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

import { hideNotification } from './actions';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class Notification extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.dispatch(hideNotification());
  };

  render() {
    const { classes, notification } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={notification.visible}
        autoHideDuration={6000}
        onRequestClose={this.handleRequestClose}
        message={notification.message}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleRequestClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles, {
    name: 'Notification',
  }),
)(Notification);

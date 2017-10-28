import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ListItem, ListItemText } from 'material-ui/List';

// A simple component that shows the pathname of the current location
class NavListItem extends Component {
  static propTypes = {
    text: PropTypes.string,
    path: PropTypes.string,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  handleClick = (path) => {
    this.props.history.push(path);
    this.props.handleDrawerChange(false);
  };

  render() {
    const { title, path } = this.props.route;
    
    return (
      <ListItem button onClick={() => this.handleClick(path)}>
        <ListItemText
          primary={title}
        />
      </ListItem>
    );
  }
}

export default withRouter(NavListItem);
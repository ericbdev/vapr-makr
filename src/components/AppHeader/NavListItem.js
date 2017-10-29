import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemText } from 'material-ui/List';

// A simple component that shows the pathname of the current location
class NavListItem extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    handleNavClick: PropTypes.func.isRequired,
  };

  render() {
    const { title, path } = this.props.route;
    const handleNavClick = this.props.handleNavClick;

    return (
      <ListItem button onClick={() => handleNavClick(path)}>
        <ListItemText primary={title}/>
      </ListItem>
    );
  }
}

export default NavListItem;
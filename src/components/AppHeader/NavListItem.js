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

  handleClick = ({history, path}) => {
    history.push(path)
  };

  render() {
    const { route, history } = this.props;
    const {title, path} = route;
    
    return (
      <ListItem button>
        <ListItemText
          primary={title}
          onClick={() => this.handleClick({history, path})}
        />
      </ListItem>
    );
  }
}

export default withRouter(NavListItem);
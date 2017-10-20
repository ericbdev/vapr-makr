import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import theme from '../config/theme';
import appConfig from '../config/config';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <AppBar title={appConfig.appName}/>
      </MuiThemeProvider>
    );
  }
}

export default App;

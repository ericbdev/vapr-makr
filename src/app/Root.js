import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import createContext from '../config/styles/createContext';

import AppHeader from '../components/AppHeader';

// Views
import Home from '../views/pages/Home';
import About from '../views/pages/About';
import Form from '../views/pages/Form';

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
  },
});

// eslint-disable-next-line
let AppWrapper = props => props.children;
AppWrapper = withStyles(styles)(AppWrapper);

const context = createContext();

class Root extends Component {
    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
          <AppWrapper>
            <Router>
              <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
                <AppHeader />
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/form" component={Form}/>
              </MuiThemeProvider>
            </Router>
          </AppWrapper>
        </JssProvider>
      );
    }
  }

export default Root;
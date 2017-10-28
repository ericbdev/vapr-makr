import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import createContext from '../config/styles/createContext';
import { routes } from '../config/index';

import AppHeader from '../components/AppHeader';

// Views
import Home from '../views/Home';
import Calculator from '../views/Calculator';
import Recipes from '../views/Recipes';
import StashBases from '../views/Stash/StashBases';
import StashFlavours from '../views/Stash/StashFlavours';
import StashJuices from '../views/Stash/StashJuices';

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
    const props = this.props;

    return (
      <Router>
        <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
          <AppWrapper>
            <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
              <AppHeader {...props} />
              <Route exact path={routes.home.path} component={Home}/>
              <Route path={routes.calculator.path} component={Calculator}/>
              <Route path={routes.recipes.path} component={Recipes}/>
              <Route path={routes.stash.children.flavours.path} component={StashFlavours}/>
              <Route path={routes.stash.children.bases.path} component={StashBases}/>
              <Route path={routes.stash.children.juices.path} component={StashJuices}/>
            </MuiThemeProvider>
          </AppWrapper>
        </JssProvider>
      </Router>
    );
  }
}

export default Root;
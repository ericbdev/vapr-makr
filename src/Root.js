import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import createContext from './config/styles/createContext';
import { routes } from './config/index';

import AppHeader from './components/AppHeader/index';
import AppPage from './components/AppPage/index';

// Views
import Home from './containers/Home/index';
import Calculator from './containers/Calculator/index';
import Recipes from './containers/Recipes/index';
import StashBases from './containers/StashBases/index';
import StashFlavors from './containers/StashFlavors/index';
import StashJuices from './containers/StashJuices/index';

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
              <div>
                <AppHeader {...props} />
                <AppPage>
                  <Route exact path={routes.home.path} component={Home}/>
                  <Route path={routes.calculator.path} component={Calculator}/>
                  <Route path={routes.recipes.path} component={Recipes}/>
                  <Route path={routes.stash.children.flavors.path} component={StashFlavors}/>
                  <Route path={routes.stash.children.bases.path} component={StashBases}/>
                  <Route path={routes.stash.children.juices.path} component={StashJuices}/>
                </AppPage>
              </div>
            </MuiThemeProvider>
          </AppWrapper>
        </JssProvider>
      </Router>
    );
  }
}

export default Root;
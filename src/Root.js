import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import 'typeface-roboto';
import createContext from './config/styles/createContext';
import { history, routes, store } from './config/index';
import apolloClient from './apolloClient';

// Apollo
import { ApolloProvider } from 'react-apollo';

// Layouts
import AppHeader from './components/AppHeader/index';
import AppPage from './components/AppPage/index';

// Views
import Home from './containers/Home';
import Calculator from './containers/Calculator';
import Recipes from './containers/Recipes';
import StashBases from './containers/StashBases';
import StashFlavors from './containers/StashFlavors';
import StashJuices from './containers/StashJuices';

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
      padding: 0,
      fontFamily: '\'Roboto\', sans-serif',
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
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
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
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default Root;
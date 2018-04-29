import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import 'typeface-roboto';
import createContext from './config/styles/createContext';
import { history, routes, store, themeStyles } from './config/index';
import apolloClient from './apolloClient';

// Apollo
import { ApolloProvider } from 'react-apollo';

// Layouts
import AppHeader from './components/AppHeader/index';

// Views - General
import Home from './containers/Home';

// Views - Recipes
import RecipesAdd from './containers/RecipesAdd';
import RecipesAll from './containers/RecipesAll';
import RecipesView from './containers/RecipesView';

// Views - Stash
import StashBases from './containers/StashBases';
import StashFlavors from './containers/StashFlavors';
import StashJuices from './containers/StashJuices';

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
      padding: 0,
      background: themeStyles.colors.fullWhite,
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

                    <Route exact path={routes.home.path} component={Home}/>
                    <Route path={routes.recipes.children.add.path} component={RecipesAdd}/>
                    <Route path={routes.recipes.children.all.path} component={RecipesAll}/>
                    <Route path={routes.recipes.children.view.path} component={RecipesView}/>
                    <Route path={routes.stash.children.flavors.path} component={StashFlavors}/>
                    <Route path={routes.stash.children.bases.path} component={StashBases}/>
                    <Route path={routes.stash.children.juices.path} component={StashJuices}/>

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
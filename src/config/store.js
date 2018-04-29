import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import appReducer from './reducers';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

function configureState(history) {
  return {
    router: applyMiddleware(routerMiddleware(history)),
  };
}

function configureStore(history) {
  const preloadedState = configureState(history);

  return createStore(
    appReducer,
    preloadedState
  );
}

const store = configureStore(history);

export {
  history,
  store,
};

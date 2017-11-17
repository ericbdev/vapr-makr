import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import appReducer from './reducers';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

function configureState(history) {
  return {
    router: applyMiddleware(routerMiddleware(history)),
  }
}

function configureStore(history) {
  const preloadedState = configureState(history);

  const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
      <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
    </DockMonitor>,
  );

  return createStore(
    appReducer,
    preloadedState,
    DevTools.instrument()
  );
}

const store = configureStore(history);


export {
  history,
  store,
};

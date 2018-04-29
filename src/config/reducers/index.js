import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import stashReducer from './stash';
import notificationReducer from './notification';

const appReducer = combineReducers({
  router : routerReducer,
  stash: stashReducer,
  notification: notificationReducer,
});

export default appReducer;

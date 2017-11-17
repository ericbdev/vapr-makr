import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import stashReducer from './stash';

const appReducer = combineReducers({
  router : routerReducer,
  stash: stashReducer,
});

export default appReducer;

import { createReducer } from '../reducerUtliities';

const addFlavorReducer = (state, action) => {
  //TODO: Handle state

  return state;
};

// Slice reducer
const stashReducer = createReducer([], {
  'ADD_FLAVOR': addFlavorReducer,
});

export default stashReducer;

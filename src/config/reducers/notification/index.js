import { createReducer } from '../reducerUtliities';

const toggleNotificationReducer = (state, action) => {
  const { message } = action.payload;
  let visible = null;

  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      visible = true;
      return {
        ...state,
        message,
        visible,
      };
    case 'HIDE_NOTIFICATION':
      visible = false;
      return {
        ...state,
        message: '',
        visible,
      };
    default:
      return state;
  }
};

// Slice reducer
const notificationReducer = createReducer([], {
  SHOW_NOTIFICATION: toggleNotificationReducer,
  HIDE_NOTIFICATION: toggleNotificationReducer,
});

export default notificationReducer;
